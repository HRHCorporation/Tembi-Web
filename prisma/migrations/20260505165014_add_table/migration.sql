-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,
    `roomSlug` VARCHAR(191) NOT NULL,
    `roomName` VARCHAR(191) NOT NULL,
    `roomPrice` DOUBLE NOT NULL,
    `basePrice` DOUBLE NOT NULL,
    `serviceFee` DOUBLE NOT NULL,
    `tourismTax` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `breakfast` INTEGER NOT NULL DEFAULT 0,
    `extraBed` INTEGER NOT NULL DEFAULT 0,
    `checkInDate` DATETIME(3) NOT NULL,
    `checkOutDate` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `adults` INTEGER NOT NULL,
    `children` INTEGER NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `customerAddress` VARCHAR(191) NOT NULL,
    `customerCity` VARCHAR(191) NOT NULL,
    `customerPostalCode` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `xenditInvoiceId` VARCHAR(191) NULL,
    `xenditInvoiceUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
