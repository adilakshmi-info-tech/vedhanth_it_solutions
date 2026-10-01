-- Additive tables only. Existing application tables and columns are untouched.
CREATE TABLE "ProductSpecification" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductSpecification_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ProductSpecification_productId_fkey"
      FOREIGN KEY ("productId") REFERENCES "Product"("id")
      ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "ProductSpecification_productId_displayOrder_idx"
  ON "ProductSpecification"("productId", "displayOrder");

CREATE TABLE "ReviewWorkflow" (
    "reviewId" TEXT NOT NULL,
    "productId" TEXT,
    "reviewType" VARCHAR(16) NOT NULL,
    "status" VARCHAR(16) NOT NULL DEFAULT 'pending',
    "approvedAt" TIMESTAMP(3),
    CONSTRAINT "ReviewWorkflow_pkey" PRIMARY KEY ("reviewId"),
    CONSTRAINT "ReviewWorkflow_reviewId_fkey"
      FOREIGN KEY ("reviewId") REFERENCES "Review"("id")
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReviewWorkflow_productId_fkey"
      FOREIGN KEY ("productId") REFERENCES "Product"("id")
      ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReviewWorkflow_reviewType_check"
      CHECK ("reviewType" IN ('product', 'company')),
    CONSTRAINT "ReviewWorkflow_status_check"
      CHECK ("status" IN ('pending', 'approved', 'rejected'))
);
CREATE INDEX "ReviewWorkflow_productId_status_idx"
  ON "ReviewWorkflow"("productId", "status");
CREATE INDEX "ReviewWorkflow_reviewType_status_idx"
  ON "ReviewWorkflow"("reviewType", "status");

CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" VARCHAR(16) NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Enquiry_status_check"
      CHECK ("status" IN ('new', 'in_progress', 'resolved', 'closed'))
);
CREATE INDEX "Enquiry_status_createdAt_idx"
  ON "Enquiry"("status", "createdAt");
CREATE INDEX "Enquiry_createdAt_idx" ON "Enquiry"("createdAt");

-- Copy only real legacy reviews into the new workflow table.
INSERT INTO "ReviewWorkflow" ("reviewId", "productId", "reviewType", "status")
SELECT "id", NULL, 'company',
       CASE WHEN "approved" THEN 'approved' ELSE 'pending' END
FROM "Review"
ON CONFLICT ("reviewId") DO NOTHING;
