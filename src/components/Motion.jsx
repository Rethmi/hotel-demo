// src/components/Motion.jsx
// Shared motion + image helpers. No new image assets: fallbacks reuse the
// photos already referenced by the home page.
import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ---------------------------------------------------------------- */
/* Images already used in the project (used only as fallbacks)       */
/* ---------------------------------------------------------------- */
export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
];

const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v.src || v.url || v.image || '' : v);

/**
 * Normalises image paths. A relative path such as "images/room.jpg" works on "/"
 * but breaks on nested routes like "/dining/ember" - the most common cause of
 * "some images don't show". Absolute URLs, data/blob URIs and "/..." are untouched.
 */
export const resolveSrc = (raw) => {
  const s = pick(raw);
  if (!s || typeof s !== 'string') return '';
  const t = s.trim();
  if (!t) return '';
  if (/^(https?:)?\/\//i.test(t) || /^(data|blob):/i.test(t) || t.startsWith('/')) return t;
  return '/' + t.replace(/^(\.{1,2}\/)+/, '');
};

/**
 * Drop-in <img> replacement. Tries: src -> any `fallbacks` -> project photos,
 * then shows a neutral placeholder instead of a broken-image icon.
 */
export const SmartImage = ({ src, alt = '', fallbacks, className = '', onLoad, onError, ...rest }) => {
  const chain = useMemo(() => {
    const own = [].concat(src || [], fallbacks || []).map(resolveSrc).filter(Boolean);
    const start = (alt.length || 0) % FALLBACK_IMAGES.length;
    const rotated = [...FALLBACK_IMAGES.slice(start), ...FALLBACK_IMAGES.slice(0, start)];
    return Array.from(new Set([...own, ...rotated]));
  }, [src, fallbacks, alt]);

  const key = chain.join('|');
  const [state, setState] = useState({ i: 0, loaded: false });
  const ref = useRef(null);

  useEffect(() => setState({ i: 0, loaded: false }), [key]);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setState((s) => (s.loaded ? s : { ...s, loaded: true }));
  }, [state.i, key]);

  const current = chain[state.i];
  if (!current) {
    return <div role="img" aria-label={alt} className={`${className} bg-gradient-to-br from-stone-200 to-stone-300`} />;
  }
  return (
    <img
      ref={ref}
      src={current}
      alt={alt}
      loading={rest.loading || 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      className={`${className} ag-img ${state.loaded ? 'is-loaded' : ''}`}
      onLoad={(e) => { setState((s) => ({ ...s, loaded: true })); onLoad && onLoad(e); }}
      onError={(e) => { setState((s) => ({ i: s.i + 1, loaded: false })); onError && onError(e); }}
      {...rest}
    />
  );
};

/* ---------------------------------------------------------------- */
/* Scroll reveal: one soft, short rise. Plays once.                  */
/* ---------------------------------------------------------------- */
export const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return undefined; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`ag-reveal ${shown ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

/* ---------------------------------------------------------------- */
/* Endless marquee: two identical groups, translate -50%, seamless.  */
/* ---------------------------------------------------------------- */
export const Marquee = ({ children, duration = 60, reverse = false, gap = 20, className = '' }) => (
  <div className={`ag-marquee ${className}`} style={{ '--dur': `${duration}s`, '--gap': `${gap}px` }}>
    <div className={`ag-track ${reverse ? 'is-reverse' : ''}`}>
      <div className="ag-group">{children}</div>
      <div className="ag-group" aria-hidden="true">{children}</div>
    </div>
  </div>
);

/* ---------------------------------------------------------------- */
/* Styles - injected once, so no tailwind.config changes are needed. */
/* ---------------------------------------------------------------- */
export const MotionStyles = () => (
  <style>{`
    :root { --ag-ease: cubic-bezier(.22,.61,.36,1); }

    .ag-reveal { opacity: 0; transform: translate3d(0,18px,0);
      transition: opacity 1s var(--ag-ease) var(--d,0ms), transform 1.1s var(--ag-ease) var(--d,0ms); will-change: opacity, transform; }
    .ag-reveal.is-in { opacity: 1; transform: none; }
    .ag-reveal .ag-rule { width: 0; transition: width 1.4s var(--ag-ease) .45s; }
    .ag-reveal.is-in .ag-rule { width: 3.5rem; }

    @keyframes ag-fade { from { opacity: 0; } }
    .ag-img.is-loaded { animation: ag-fade .9s ease; }

    /* Hero: one orchestrated entrance */
    @keyframes ag-up { to { transform: translate3d(0,0,0); } }
    @keyframes ag-in { from { opacity: 0; transform: translate3d(0,12px,0); } to { opacity: 1; transform: none; } }
    @keyframes ag-kb { from { transform: scale(1.04) translate3d(0,0,0); } to { transform: scale(1.13) translate3d(-1.2%,-1%,0); } }
    .ag-mask { display: block; overflow: hidden; padding-bottom: .14em; margin-bottom: -.14em; }
    .ag-mask > span { display: block; transform: translate3d(0,110%,0); animation: ag-up 1.3s var(--ag-ease) var(--d,0ms) forwards; }
    .ag-intro { opacity: 0; animation: ag-in 1.1s var(--ag-ease) var(--d,0ms) forwards; }
    .ag-kenburns { animation: ag-kb 32s ease-in-out infinite alternate; will-change: transform; }

    /* Marquee */
    @keyframes ag-scroll { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
    .ag-marquee { overflow: hidden;
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
              mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
    .ag-track { display: flex; width: max-content; animation: ag-scroll var(--dur,60s) linear infinite; will-change: transform; }
    .ag-track.is-reverse { animation-direction: reverse; }
    .ag-marquee:hover .ag-track { animation-play-state: paused; }
    .ag-group { display: flex; flex-shrink: 0; align-items: center; gap: var(--gap,20px); padding-right: var(--gap,20px); }

    @media (prefers-reduced-motion: reduce) {
      .ag-reveal, .ag-intro { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
      .ag-mask > span { transform: none !important; animation: none !important; }
      .ag-kenburns, .ag-img.is-loaded { animation: none !important; }
      .ag-track { animation-duration: 240s; }
      .ag-reveal .ag-rule { width: 3.5rem; transition: none; }
    }
  `}</style>
);