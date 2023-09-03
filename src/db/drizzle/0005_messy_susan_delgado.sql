CREATE TABLE `venues` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` text,
	`name` varchar(255) NOT NULL,
	`email` varchar(255),
	`phone` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`images` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `venues_id` PRIMARY KEY(`id`)
);
