-- Safe manual rollback: refuse to discard any data written to these tables.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "ProductSpecification" LIMIT 1)
     OR EXISTS (SELECT 1 FROM "ReviewWorkflow" LIMIT 1)
     OR EXISTS (SELECT 1 FROM "Enquiry" LIMIT 1) THEN
    RAISE EXCEPTION 'Rollback refused: export and preserve new-table data before rollback.';
  END IF;
END $$;

DROP TABLE "Enquiry";
DROP TABLE "ReviewWorkflow";
DROP TABLE "ProductSpecification";
