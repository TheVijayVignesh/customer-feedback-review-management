import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
import { catchAsync } from "../utils/catchAsync";

const prisma = new PrismaClient();

export const getAllTrainers = catchAsync(async (req: Request, res: Response) => {

  const trainers = await prisma.trainer.findMany({
    include: {
      courses: {
        include: {
          feedbacks: true
        }
      }
    }
  });

  const formattedTrainers = trainers.map((trainer) => {

    let totalRating = 0;
    let feedbackCount = 0;
    let uniqueTrainees = new Set();

    trainer.courses.forEach((course) => {
      course.feedbacks.forEach((fb) => {
        totalRating += fb.rating;
        feedbackCount++;
        uniqueTrainees.add(fb.traineeId);
      });
    });

    const avgRating = feedbackCount > 0 ? totalRating / feedbackCount : 0;

    const avatar = trainer.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    return {
      id: trainer.id,
      name: trainer.name,
      course: trainer.courses[0]?.title || "General",
      rating: Number(avgRating.toFixed(1)),
      avatar,
      students: uniqueTrainees.size,
      experience: trainer.expertise ? `${trainer.expertise}` : "5 yrs",
      bio: trainer.expertise ? `Expert trainer with focus on ${trainer.expertise}.` : "Expert trainer at our academy."
    };
  });

  res.status(200).json({
    status: "success",
    data: formattedTrainers
  });

});