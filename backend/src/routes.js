import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    status: 'API funcionando!',
    endpoints: {
      docs: '/api-docs', 
      health: '/health' 
    }
  });
});

export default router;