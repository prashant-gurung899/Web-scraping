-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "stock" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
