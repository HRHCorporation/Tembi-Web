-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "roomSlug" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomPrice" INTEGER NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "serviceFee" INTEGER NOT NULL,
    "tourismTax" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerAddress" TEXT,
    "customerCity" TEXT,
    "customerPostalCode" TEXT,
    "breakfast" INTEGER NOT NULL DEFAULT 0,
    "extraBed" INTEGER NOT NULL DEFAULT 0,
    "specialRequest" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "xenditInvoiceId" TEXT,
    "xenditInvoiceUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_checkInDate_idx" ON "Booking"("checkInDate");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");
