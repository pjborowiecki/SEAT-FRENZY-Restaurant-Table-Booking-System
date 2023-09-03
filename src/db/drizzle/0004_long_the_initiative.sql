CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`clerkId` varchar(255) NOT NULL,
	`username` varchar(255),
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255),
	`lastName` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `bookings`;--> statement-breakpoint
DROP TABLE `cuisines`;--> statement-breakpoint
DROP TABLE `dietary`;--> statement-breakpoint
DROP TABLE `menuItems`;--> statement-breakpoint
DROP TABLE `reviews`;--> statement-breakpoint
DROP TABLE `tables`;--> statement-breakpoint
DROP TABLE `venues`;