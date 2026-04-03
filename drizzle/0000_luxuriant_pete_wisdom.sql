CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"whatsapp" text,
	"instagram" text,
	"tiktok" text,
	"location" text,
	"contact_info" text
);
--> statement-breakpoint
CREATE TABLE "faq" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "hair_colors" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_inches" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"inches" integer NOT NULL,
	"additional_price" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hair_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"texture" text,
	"hair_type" text,
	"origin" text,
	"processing" text,
	"options" text,
	"price" integer NOT NULL,
	"previous_price" integer,
	"is_on_sale" boolean DEFAULT false NOT NULL,
	"category_id" integer,
	"availability" text NOT NULL,
	"quantity_in_hand" integer
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "hair_colors" ADD CONSTRAINT "hair_colors_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hair_images" ADD CONSTRAINT "hair_images_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hair_inches" ADD CONSTRAINT "hair_inches_product_id_hair_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."hair_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hair_products" ADD CONSTRAINT "hair_products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;