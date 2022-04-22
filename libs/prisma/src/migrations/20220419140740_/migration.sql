/*
  Warnings:

  - You are about to drop the `_MatchToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchToSupervisor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_MatchToStudent` DROP FOREIGN KEY `_MatchToStudent_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_MatchToStudent` DROP FOREIGN KEY `_MatchToStudent_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_MatchToSupervisor` DROP FOREIGN KEY `_MatchToSupervisor_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_MatchToSupervisor` DROP FOREIGN KEY `_MatchToSupervisor_ibfk_2`;

-- DropTable
DROP TABLE `_MatchToStudent`;

-- DropTable
DROP TABLE `_MatchToSupervisor`;

-- DropTable
DROP TABLE `matches`;
