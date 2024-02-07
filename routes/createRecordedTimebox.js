import prisma from "@/modules/prismaClient";
import express from 'express';
import prisma from '@/modules/prismaClient';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    await prisma.recordedTimeBox.create({
      data: data,
    });
    res.status(200).json({ message: 'Recorded TimeBox created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;