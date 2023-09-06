CREATE TABLE `dietary` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `dietary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venueTimes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`venueId` int NOT NULL,
	`day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
	`openingTime` time NOT NULL,
	`closingTime` time NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `venueTimes_id` PRIMARY KEY(`id`),
	CONSTRAINT `venueTimes_venueId_day_unique` UNIQUE(`venueId`,`day`)
);
--> statement-breakpoint
CREATE TABLE `venuesToDietary` (
	`venueId` int NOT NULL,
	`dietaryId` int NOT NULL,
	CONSTRAINT `venuesToDietary_dietaryId_venueId` PRIMARY KEY(`dietaryId`,`venueId`)
);
--> statement-breakpoint
CREATE TABLE `venuesToTags` (
	`venueId` int NOT NULL,
	`tagId` int NOT NULL,
	CONSTRAINT `venuesToTags_tagId_venueId` PRIMARY KEY(`tagId`,`venueId`)
);
--> statement-breakpoint
ALTER TABLE `venuesToCuisines` DROP FOREIGN KEY `venuesToCuisines_venueId_venues_id_fk`;
--> statement-breakpoint
ALTER TABLE `venuesToCuisines` DROP FOREIGN KEY `venuesToCuisines_cuisineId_cuisines_id_fk`;
--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `cuisineId`;