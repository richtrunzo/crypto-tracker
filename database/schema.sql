set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
 CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "wallet" (
	"userId" integer NOT NULL,
	"coinname" VARCHAR(255) NOT NULL,
	"amount" integer NOT NULL,
	"coinId" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "wallet" ADD CONSTRAINT "wallet_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
create schema "public";
