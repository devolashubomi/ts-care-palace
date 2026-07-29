/*
  Safe migration from enum Category to ProductCategory table
*/

-- Rename the existing enum so it doesn't conflict
ALTER TYPE "Category" RENAME TO "CategoryEnum";

-- Create ProductCategory table
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProductCategory_name_key"
ON "ProductCategory"("name");

CREATE UNIQUE INDEX "ProductCategory_slug_key"
ON "ProductCategory"("slug");

-- Seed the default categories
INSERT INTO "ProductCategory" ("id", "name", "slug")
VALUES
('cat_cosmetics', 'Cosmetics', 'cosmetics'),
('cat_organic', 'Organic', 'organic');

-- Add categoryId as nullable
ALTER TABLE "Product"
ADD COLUMN "categoryId" TEXT;

-- Copy existing enum values into the new table
UPDATE "Product"
SET "categoryId" =
CASE
    WHEN "category" = 'cosmetics' THEN 'cat_cosmetics'
    WHEN "category" = 'organic' THEN 'cat_organic'
END;

-- Make categoryId required
ALTER TABLE "Product"
ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop the old enum column
ALTER TABLE "Product"
DROP COLUMN "category";

-- Drop the renamed enum
DROP TYPE "CategoryEnum";

-- Add the foreign key
ALTER TABLE "Product"
ADD CONSTRAINT "Product_categoryId_fkey"
FOREIGN KEY ("categoryId")
REFERENCES "ProductCategory"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;