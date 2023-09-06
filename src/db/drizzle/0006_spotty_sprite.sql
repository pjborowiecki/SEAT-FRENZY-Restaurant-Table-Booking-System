CREATE TABLE `cuisines` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `cuisines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venuesToCuisines` (
	`venueId` int NOT NULL,
	`cuisineId` int NOT NULL,
	CONSTRAINT `venuesToCuisines_cuisineId_venueId` PRIMARY KEY(`cuisineId`,`venueId`)
);
--> statement-breakpoint
ALTER TABLE `venues` MODIFY COLUMN `slug` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `venues` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `emailAddress` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `phoneNumber` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `venues` ADD `cuisineId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `venuesToCuisines` ADD CONSTRAINT `venuesToCuisines_venueId_venues_id_fk` FOREIGN KEY (`venueId`) REFERENCES `venues`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `venuesToCuisines` ADD CONSTRAINT `venuesToCuisines_cuisineId_cuisines_id_fk` FOREIGN KEY (`cuisineId`) REFERENCES `cuisines`(`id`) ON DELETE no action ON UPDATE no action;