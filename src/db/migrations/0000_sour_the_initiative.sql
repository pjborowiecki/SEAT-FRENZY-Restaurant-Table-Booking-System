CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerificationToken` varchar(255),
	`emailVerified` timestamp(3),
	`passwordHash` text,
	`resetPasswordToken` varchar(255),
	`resetPasswordTokenExpires` timestamp(3),
	`image` varchar(255),
	`createdAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_emailVerificationToken_unique` UNIQUE(`emailVerificationToken`),
	CONSTRAINT `user_resetPasswordToken_unique` UNIQUE(`resetPasswordToken`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
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
CREATE TABLE `cuisines` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `cuisines_id` PRIMARY KEY(`id`)
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
CREATE TABLE `tables` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`venueId` int NOT NULL,
	`capacity` int,
	`tableNumber` int NOT NULL,
	`location` enum('inside','outside'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `tables_id` PRIMARY KEY(`id`)
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
CREATE TABLE `venues` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`images` json DEFAULT ('null'),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `venues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venuesToCuisines` (
	`venueId` int NOT NULL,
	`cuisineId` int NOT NULL,
	CONSTRAINT `venuesToCuisines_cuisineId_venueId` PRIMARY KEY(`cuisineId`,`venueId`)
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
