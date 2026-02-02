ALTER TABLE "vans" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "vans" ALTER COLUMN "type" SET DEFAULT 'simple'::text;--> statement-breakpoint
DROP TYPE "public"."VanType";--> statement-breakpoint
CREATE TYPE "public"."VanType" AS ENUM('simple', 'rugged', 'luxury');--> statement-breakpoint
ALTER TABLE "vans" ALTER COLUMN "type" SET DEFAULT 'simple'::"public"."VanType";--> statement-breakpoint
ALTER TABLE "vans" ALTER COLUMN "type" SET DATA TYPE "public"."VanType" USING "type"::"public"."VanType";--> statement-breakpoint
ALTER TABLE "vans" ADD CONSTRAINT "vans_sanity_id_unique" UNIQUE("sanity_id");