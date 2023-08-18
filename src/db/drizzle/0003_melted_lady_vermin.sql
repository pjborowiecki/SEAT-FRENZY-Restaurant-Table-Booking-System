CREATE TABLE `bookings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`venueId` int NOT NULL,
	`tableId` int,
	`people` int NOT NULL,
	`price` decimal NOT NULL,
	`bookingDate` date NOT NULL,
	`bookingTime` time NOT NULL,
	`status` enum('Upcoming','Now','Future'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dietary` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `dietary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`venueId` int NOT NULL,
	`description` text,
	`service` real NOT NULL DEFAULT 2.5,
	`priciness` real NOT NULL DEFAULT 2.5,
	`location` real NOT NULL DEFAULT 2.5,
	`food` real NOT NULL DEFAULT 2.5,
	`atmosphere` real NOT NULL DEFAULT 2.5,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tables` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`venueId` int NOT NULL,
	`capacity` int,
	`tableNumber` int NOT NULL,
	`location` enum('Inside','Outside'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `tables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `locations`;--> statement-breakpoint
ALTER TABLE `venues` ADD `tags` varchar(255);--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `phone`;--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `openTime`;--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `closeTime`;--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `priciness`;--> statement-breakpoint
ALTER TABLE `venues` DROP COLUMN `cuisineId`;