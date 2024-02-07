import prisma from "@/modules/prismaClient";
import express from 'express';
import prisma from '@/modules/prismaClient';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = req.body;
        const schedules = await prisma.schedule.findMany({
            where: {
                userEmail: data.userEmail,
            },
            select: {
                id: true,
                name: true,
                boxSizeNumber: true,
                boxSizeUnit: true,
                wakeupTime: true,
                goals: {
                    select: {
                        id: true,
                        name: true,
                        priority: true,
                        targetDate: true,
                        timeboxes: {
                            orderBy: {
                                startTime: 'asc',
                            },
                            where: {
                                OR: [
                                    {
                                        AND: [
                                            { reoccuringID: null },
                                            { startTime: { gte: data.startOfWeek, lte: data.endOfWeek } },
                                        ],
                                    },
                                    { NOT: { reoccuringID: null } },
                                ],
                            },
                            select: {
                                title: true,
                                description: true,
                                startTime: true,
                                endTime: true,
                                numberOfBoxes: true,
                                color: true,
                                id: true,
                                recordedTimeBoxes: {
                                    select: {
                                        id: true,
                                        timeBox: { select: { id: true, title: true, description: true } },
                                    },
                                },
                                reoccuring: {
                                    select: {
                                        id: true,
                                        reoccurFrequency: true,
                                        weeklyDay: true,
                                    },
                                },
                            },
                        },
                    },
                },
                timeboxes: {
                    orderBy: {
                        startTime: 'asc',
                    },
                    where: {
                        startTime: {
                            gte: data.startOfWeek,
                            lte: data.endOfWeek,
                        },
                    },
                    select: {
                        title: true,
                        description: true,
                        startTime: true,
                        endTime: true,
                        numberOfBoxes: true,
                        color: true,
                        id: true,
                        recordedTimeBoxes: {
                            select: {
                                id: true,
                                recordedStartTime: true,
                                timeBoxID: true,
                                timeBox: { select: { title: true, description: true } },
                            },
                        },
                        reoccuring: {
                            select: {
                                id: true,
                                reoccurFrequency: true,
                                weeklyDay: true,
                            },
                        },
                    },
                },
                recordedTimeboxes: {
                    orderBy: {
                        recordedStartTime: 'asc',
                    },
                    where: {
                        recordedStartTime: {
                            gte: data.startOfWeek,
                        },
                    },
                },
            },
        });

        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;