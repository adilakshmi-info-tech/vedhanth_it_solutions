CREATE TABLE "ReviewAvatarPreference" (
  "reviewId" TEXT NOT NULL,
  "avatarStyle" VARCHAR(16) NOT NULL DEFAULT 'neutral',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReviewAvatarPreference_pkey" PRIMARY KEY ("reviewId"),
  CONSTRAINT "ReviewAvatarPreference_reviewId_fkey"
    FOREIGN KEY ("reviewId") REFERENCES "Review"("id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "ReviewAvatarPreference_avatarStyle_check"
    CHECK ("avatarStyle" IN ('boy', 'girl', 'neutral'))
);

INSERT INTO "ReviewAvatarPreference" ("reviewId", "avatarStyle", "createdAt")
SELECT
  "id",
  CASE lower(btrim("name"))
    WHEN 'yogesh' THEN 'boy'
    WHEN 'rajesh kumar' THEN 'boy'
    WHEN 'priya nair' THEN 'girl'
    ELSE 'neutral'
  END,
  "createdAt"
FROM "Review"
ON CONFLICT ("reviewId") DO NOTHING;
