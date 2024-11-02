CREATE TABLE "links" (
  "id" bigserial PRIMARY KEY,
  "useranme" varchar NOT NULL,
  "original_url" varchar NOT NULL,
  "shorten_url" varchar NOT NULL,
  "shorten_id" varchar NOT NULL,
  "click_counts" int DEFAULT 0,
  "qr_counts" int DEFAULT 0
);
