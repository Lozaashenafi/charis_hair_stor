CREATE TABLE "common_colors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "common_colors_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'unread' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "hair_colors" ADD COLUMN "additional_price" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "hair_colors" ADD COLUMN "is_restocked" boolean DEFAULT true NOT NULL;