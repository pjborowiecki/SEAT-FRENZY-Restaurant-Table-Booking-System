CREATE TABLE `cuisines` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `cuisines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuItems` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`price` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	`venueId` int NOT NULL,
	CONSTRAINT `menuItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venues` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` text,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`openTime` enum('14:00:00.000Z','15:00:00.000Z','16:00:00.000Z','17:00:00.000Z','18:00:00.000Z','19:00:00.000Z','20:00:00.000Z') NOT NULL DEFAULT '18:00:00.000Z',
	`closeTime` enum('21:00:00.000Z','21:30:00.000Z','22:00:00.000Z','22:30:00.000Z','23:00:00.000Z','23:30:00.000Z','00:00:00.000Z','01:00:00.000Z') NOT NULL DEFAULT '23:00:00.000Z',
	`priciness` enum('cheap','regular','expensive') NOT NULL DEFAULT 'regular',
	`locationId` int NOT NULL,
	`cuisineId` int NOT NULL,
	`images` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `venues_id` PRIMARY KEY(`id`)
);
