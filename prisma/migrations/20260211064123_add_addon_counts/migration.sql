/*
  Warnings:

  - You are about to drop the column `breakfast` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `extraBed` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequest` on the `Booking` table. All the data in the column will be lost.
  - Made the column `customerAddress` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerCity` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerPostalCode` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Booking_checkInDate_idx";

-- DropIndex
DROP INDEX "public"."Booking_createdAt_idx";

-- DropIndex
DROP INDEX "public"."Booking_customerEmail_idx";

-- DropIndex
DROP INDEX "public"."Booking_status_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "breakfast",
DROP COLUMN "extraBed",
DROP COLUMN "paymentMethod",
DROP COLUMN "specialRequest",
ADD COLUMN     "breakfastCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "extraBedCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "roomPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "serviceFee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tourismTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "customerAddress" SET NOT NULL,
ALTER COLUMN "customerCity" SET NOT NULL,
ALTER COLUMN "customerPostalCode" SET NOT NULL;
