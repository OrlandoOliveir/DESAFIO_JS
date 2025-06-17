jest.setTimeout(15000);

afterAll(async () => {
  const mongoose = await import('mongoose');
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
});