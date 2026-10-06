import React, { useState } from 'react';
import { Eye, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hotelData';

export const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Rooms', 'Dining', 'Pool', 'Spa', 'Experiences', 'Events', 'Property'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-24 pb-20">
      
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-white py-20 px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">
          Visual Symphony
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Resort Gallery
        </h1>
        <p className="font-serif text-lg sm:text-xl text-zinc-300 italic max-w-2xl mx-auto font-light">
          "A curated glimpse into the architecture, turquoise seas, and luminous evenings of Aurelia Grand Resort."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white rounded-xl border border-sand-300 shadow-sm max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-white shadow'
                  : 'bg-sand-100 hover:bg-sand-200 text-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-900 cursor-pointer shadow-sm hover:shadow-luxury transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <span className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                  <Eye className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block">
                    {item.category}
                  </span>
                  <p className="font-serif font-bold text-white text-sm">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/98 backdrop-blur-xl flex flex-col justify-between p-6 animate-fade-in">
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block">
                {filteredItems[lightboxIndex].category}
              </span>
              <p className="font-serif text-lg font-bold">{filteredItems[lightboxIndex].title}</p>
            </div>
            <button onClick={closeLightbox} className="p-2 text-zinc-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative my-4">
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center text-xs text-zinc-400">
            <span>{lightboxIndex + 1} of {filteredItems.length} Photographs</span>
          </div>
        </div>
      )}

    </div>
  );
};
