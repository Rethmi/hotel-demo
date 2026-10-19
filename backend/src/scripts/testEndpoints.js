import app from '../server.js';

const runTests = async () => {
  const PORT = 5099;
  const server = app.listen(PORT, async () => {
    console.log(`\n🧪 [Test Suite] Running API integration tests against http://localhost:${PORT} ...\n`);

    const baseURL = `http://localhost:${PORT}/api`;
    let passed = 0;
    let failed = 0;

    const assert = (condition, name) => {
      if (condition) {
        console.log(`  ✅ [PASS] ${name}`);
        passed++;
      } else {
        console.error(`  ❌ [FAIL] ${name}`);
        failed++;
      }
    };

    try {
      // 1. Health check
      const healthRes = await fetch(`${baseURL}/health`);
      const healthData = await healthRes.json();
      assert(healthRes.status === 200 && healthData.status === 'online', 'GET /api/health');

      // 2. Auth Demo Login
      const demoRes = await fetch(`${baseURL}/auth/demo`, { method: 'POST' });
      const demoData = await demoRes.json();
      assert(demoRes.status === 200 && demoData.success && demoData.data.token, 'POST /api/auth/demo');
      const token = demoData.data.token;

      // 3. Auth Profile with JWT
      const meRes = await fetch(`${baseURL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await meRes.json();
      assert(meRes.status === 200 && meData.data.name.includes('Julian'), 'GET /api/auth/me (Protected)');

      // 4. Get Rooms
      const roomsRes = await fetch(`${baseURL}/rooms`);
      const roomsData = await roomsRes.json();
      assert(roomsRes.status === 200 && roomsData.count >= 5, `GET /api/rooms (Count: ${roomsData.count})`);

      // 5. Get Single Room & Check Availability
      const singleRoomRes = await fetch(`${baseURL}/rooms/ocean-view-room`);
      const singleRoomData = await singleRoomRes.json();
      assert(singleRoomRes.status === 200 && singleRoomData.data.roomId === 'ocean-view-room', 'GET /api/rooms/:id');

      const availRes = await fetch(`${baseURL}/rooms/ocean-view-room/availability?checkIn=2026-11-01&checkOut=2026-11-05`);
      const availData = await availRes.json();
      assert(availRes.status === 200 && availData.data.isAvailable === true, 'GET /api/rooms/:id/availability');

      // 6. Get User Bookings
      const bookingsRes = await fetch(`${baseURL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookingsData = await bookingsRes.json();
      assert(bookingsRes.status === 200 && bookingsData.count >= 3, `GET /api/bookings (Count: ${bookingsData.count})`);

      // 7. Lookup Booking by Reference
      const lookupRes = await fetch(`${baseURL}/bookings/lookup?reference=AGR-99421-2026&email=julian.davenport@davenport-estates.co.uk`);
      const lookupData = await lookupRes.json();
      assert(lookupRes.status === 200 && lookupData.data.bookingReference === 'AGR-99421-2026', 'GET /api/bookings/lookup');

      // 8. Create New Booking
      const newBookingRes = await fetch(`${baseURL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: 'deluxe-room',
          checkIn: '2026-12-20',
          checkOut: '2026-12-24',
          guests: { adults: 2, children: 0 },
          subtotal: 720,
          total: 806,
          guest: {
            firstName: 'Lord Julian',
            lastName: 'Davenport',
            email: 'julian.davenport@davenport-estates.co.uk',
            phone: '+44 7911 123456',
          },
          bedPreference: '1 King Bed',
          specialRequests: 'Balcony facing sunset',
        }),
      });
      const newBookingData = await newBookingRes.json();
      assert(newBookingRes.status === 201 && newBookingData.success, `POST /api/bookings (Ref: ${newBookingData.data?.bookingReference})`);

      // 9. Dining: Get Restaurants & Book Table
      const diningRes = await fetch(`${baseURL}/dining`);
      const diningData = await diningRes.json();
      assert(diningRes.status === 200 && diningData.count >= 4, `GET /api/dining (Count: ${diningData.count})`);

      const tableRes = await fetch(`${baseURL}/dining/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restaurantId: 'horizon',
          restaurantName: 'Horizon Oceanfront Dining',
          date: '2026-10-20',
          time: '20:30',
          guests: 2,
          seating: 'Cliffside Window Table',
          occasion: 'Gourmet Tasting',
        }),
      });
      const tableData = await tableRes.json();
      assert(tableRes.status === 201 && tableData.data.reservationId, 'POST /api/dining/reservations');

      // 10. Spa: Get Services & Book Appointment
      const spaRes = await fetch(`${baseURL}/spa/services`);
      const spaData = await spaRes.json();
      assert(spaRes.status === 200 && spaData.count >= 5, `GET /api/spa/services (Count: ${spaData.count})`);

      const spaApptRes = await fetch(`${baseURL}/spa/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: 'couples-sanctuary',
          serviceName: 'Couples Oceanfront Aromatherapy Sanctuary',
          date: '2026-10-21',
          time: '15:00',
          duration: '120 min',
          price: 490,
          therapist: 'Antoine',
        }),
      });
      const spaApptData = await spaApptRes.json();
      assert(spaApptRes.status === 201 && spaApptData.data.appointmentId, 'POST /api/spa/appointments');

      // 11. Room Service: Menu & Order
      const menuRes = await fetch(`${baseURL}/room-service/menu`);
      const menuData = await menuRes.json();
      assert(menuRes.status === 200 && menuData.count >= 8, `GET /api/room-service/menu (Count: ${menuData.count})`);

      const orderRes = await fetch(`${baseURL}/room-service/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomNumber: 'Suite 702',
          items: [{ itemId: 'dish-1', name: 'Eggs Benedict Royale', qty: 2, price: 34 }],
          instructions: 'Extra hollandaise on side',
        }),
      });
      const orderData = await orderRes.json();
      assert(orderRes.status === 201 && orderData.data.orderId, 'POST /api/room-service/orders');

      // 12. Guest Concierge Requests
      const reqRes = await fetch(`${baseURL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: 'Transportation',
          title: 'Helicopter transfer to Monaco Heliport',
          details: 'Departing 14:00 on 22 October',
        }),
      });
      const reqData = await reqRes.json();
      assert(reqRes.status === 201 && reqData.data.requestId, 'POST /api/requests');

      // 13. Notifications
      const notifRes = await fetch(`${baseURL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const notifData = await notifRes.json();
      assert(notifRes.status === 200 && notifData.count > 0, `GET /api/notifications (Count: ${notifData.count})`);

      // 14. Contact Inquiry
      const contactRes = await fetch(`${baseURL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Lady Charlotte Davenport',
          email: 'charlotte@davenport-estates.co.uk',
          phone: '+44 7911 123456',
          department: 'Private Events',
          message: 'Inquiring regarding private cliffside terrace for 30 guests in July.',
        }),
      });
      const contactData = await contactRes.json();
      assert(contactRes.status === 201 && contactData.success, 'POST /api/contact');

      // 15. Content: Offers, Experiences, Addons, Reviews
      const offersRes = await fetch(`${baseURL}/content/offers`);
      const offersData = await offersRes.json();
      assert(offersRes.status === 200 && offersData.count >= 4, `GET /api/content/offers (Count: ${offersData.count})`);

      const expRes = await fetch(`${baseURL}/content/experiences`);
      const expData = await expRes.json();
      assert(expRes.status === 200 && expData.count >= 4, `GET /api/content/experiences (Count: ${expData.count})`);

      const addonsRes = await fetch(`${baseURL}/content/addons`);
      const addonsData = await addonsRes.json();
      assert(addonsRes.status === 200 && addonsData.count >= 4, `GET /api/content/addons (Count: ${addonsData.count})`);

      const revRes = await fetch(`${baseURL}/content/reviews`);
      const revData = await revRes.json();
      assert(revRes.status === 200 && revData.count >= 4, `GET /api/content/reviews (Count: ${revData.count})`);

      console.log(`\n======================================================`);
      console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
      console.log(`======================================================\n`);
    } catch (err) {
      console.error('Test execution error:', err);
    } finally {
      server.close(() => process.exit(failed > 0 ? 1 : 0));
    }
  });
};

runTests();
