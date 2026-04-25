/*
  Warnings:

  - You are about to drop the column `breakfastCount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `extraBedCount` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `roomPrice` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `basePrice` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `serviceFee` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `tourismTax` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalPrice` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "breakfastCount",
DROP COLUMN "extraBedCount",
ADD COLUMN     "breakfast" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "extraBed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "specialRequest" TEXT,
ALTER COLUMN "roomPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "basePrice" SET DATA TYPE INTEGER,
ALTER COLUMN "serviceFee" SET DATA TYPE INTEGER,
ALTER COLUMN "tourismTax" SET DATA TYPE INTEGER,
ALTER COLUMN "totalPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "customerAddress" DROP NOT NULL,
ALTER COLUMN "customerCity" DROP NOT NULL,
ALTER COLUMN "customerPostalCode" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_checkInDate_idx" ON "Booking"("checkInDate");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");
