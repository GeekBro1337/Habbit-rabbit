-- CreateEnum
CREATE TYPE "HabitType" AS ENUM ('DAILY', 'WEEKLY', 'REGULAR', 'DESIRED_RESULT');

-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('DONE', 'NOT_DONE', 'IN_PROGRESS', 'ABANDONED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reminderTime" TIMESTAMP(3),
    "habitType" "HabitType" NOT NULL,
    "rating" INTEGER NOT NULL,
    "color" TEXT,
    "status" "HabitStatus" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRating" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "averageTaskRating" DOUBLE PRECISION NOT NULL,
    "completedTasks" INTEGER NOT NULL,
    "notCompletedTasks" INTEGER NOT NULL,
    "inProgressTasks" INTEGER NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRating_userId_key" ON "UserRating"("userId");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
