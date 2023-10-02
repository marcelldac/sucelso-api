/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_teacherId_fkey`;

-- DropTable
DROP TABLE `Class`;

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,

    UNIQUE INDEX `Grade_teacherId_key`(`teacherId`),
    UNIQUE INDEX `Grade_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
