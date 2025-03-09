-- CreateEnum
CREATE TYPE "HabitVisibility" AS ENUM ('PRIVATE', 'PUBLIC', 'SHARED');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "visibility" "HabitVisibility" NOT NULL DEFAULT 'PRIVATE';

-- CreateTable
CREATE TABLE "SharedHabit" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SharedHabit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SharedHabit_habitId_userId_key" ON "SharedHabit"("habitId", "userId");

-- AddForeignKey
ALTER TABLE "SharedHabit" ADD CONSTRAINT "SharedHabit_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedHabit" ADD CONSTRAINT "SharedHabit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
