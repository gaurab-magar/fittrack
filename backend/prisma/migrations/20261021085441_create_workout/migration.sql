-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('Running', 'StrengthTraining', 'Cycling', 'Walking', 'Swimming', 'Other');

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);
