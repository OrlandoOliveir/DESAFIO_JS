import request from 'supertest';
import createApp from '../app.js';
import mongoose from 'mongoose';

// Mock completo do mongoose
jest.mock('mongoose', () => ({
  connection: {
    readyState: 0,
    close: jest.fn().mockResolvedValue(true)
  },
  connect: jest.fn().mockResolvedValue({
    connection: {
      readyState: 1,
      close: jest.fn().mockResolvedValue(true)
    }
  }),
  Schema: jest.fn(),
  model: jest.fn().mockImplementation(() => ({
    find: jest.fn().mockResolvedValue([{ nome: 'Tarefa Teste' }]),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  }))
}));

describe('Testes básicos do servidor', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('deve retornar status 200 para a rota /api/tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('deve retornar 404 para rotas inexistentes', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.statusCode).toBe(404);
  });
});