const express = require('express');
const prisma = require('../modules/prismaClient');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const recordedTimeBoxes = await prisma.timeBox.findUnique({
      where: { id: data.id, recordedTimeBoxes: { some: {} } },
      select: { recordedTimeBoxes: { select: { id: true } } }
    });

    if (recordedTimeBoxes && recordedTimeBoxes.recordedTimeBoxes.length > 0) {
      for (const recordedTimeBox of recordedTimeBoxes.recordedTimeBoxes) {
        await prisma.recordedTimeBox.delete({
          where: {
            id: recordedTimeBox.id
          }
        });
      }
    }

    await prisma.timeBox.delete({
      where: {
        id: data.id
      }
    });

    res.status(200).json({ message: 'TimeBox deleted successfully' });
  } catch (error) {
    console.error('Error deleting timebox:', error);

    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;