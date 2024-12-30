import { pgTable, integer, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  description: text().notNull(),
  about: varchar({ length: 255 }),
  category: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }).notNull(),
  fileUrl: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }),
  createdBy: varchar({ length: 255 }).notNull().references(() => usersTable.email),
});


export const cartTable = pgTable("cart", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().references(() => usersTable.email),
  productId: integer().notNull().references(() => productsTable.id),
});
