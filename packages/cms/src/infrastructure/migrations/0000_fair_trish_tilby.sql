CREATE TABLE "menu_items_to_sizes" (
	"menuItemId" uuid NOT NULL,
	"sizeId" uuid NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"updatedDate" timestamp DEFAULT now(),
	"createdById" uuid,
	"updatedById" uuid
);
--> statement-breakpoint
CREATE TABLE "menu_items_to_tags" (
	"menuItemId" uuid NOT NULL,
	"tagId" uuid NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"updatedDate" timestamp DEFAULT now(),
	"createdById" uuid,
	"updatedById" uuid
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"imageUrl" varchar(512),
	"price" numeric(10, 2),
	"isFavorite" boolean DEFAULT false NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"updatedDate" timestamp DEFAULT now(),
	"createdById" uuid,
	"updatedById" uuid
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"updatedDate" timestamp DEFAULT now(),
	"createdById" uuid,
	"updatedById" uuid
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"updatedDate" timestamp DEFAULT now(),
	"createdById" uuid,
	"updatedById" uuid
);
--> statement-breakpoint
ALTER TABLE "menu_items_to_sizes" ADD CONSTRAINT "menu_items_to_sizes_menuItemId_menu_items_id_fk" FOREIGN KEY ("menuItemId") REFERENCES "public"."menu_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_items_to_sizes" ADD CONSTRAINT "menu_items_to_sizes_sizeId_sizes_id_fk" FOREIGN KEY ("sizeId") REFERENCES "public"."sizes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_items_to_tags" ADD CONSTRAINT "menu_items_to_tags_menuItemId_menu_items_id_fk" FOREIGN KEY ("menuItemId") REFERENCES "public"."menu_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_items_to_tags" ADD CONSTRAINT "menu_items_to_tags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;