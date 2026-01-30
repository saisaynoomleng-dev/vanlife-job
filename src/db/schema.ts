import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const createdAt = t
  .timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
  .notNull()
  .defaultNow();

export const updatedAt = t
  .timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const id = t.uuid('id').primaryKey().defaultRandom();

export const VanType = t.pgEnum('VanType', ['simple', 'rugged', 'luxury']);

export const BookingStatus = t.pgEnum('BookingStatus', [
  'PENDING',
  'PAID',
  'CANCELLED',
  'REFUNDED',
]);

export const VanTable = t.pgTable('vans', {
  id,
  name: t.varchar('name', { length: 255 }).notNull(),
  sanityId: t.text('sanity_id').notNull().unique(),
  pricePerDayInCents: t.integer('price_per_day_in_cents').notNull(),
  isAvailable: t.boolean('is_available').default(true).notNull(),
  type: VanType('type').default('simple').notNull(),
  createdAt,
  updatedAt,
});

export const UserTable = t.pgTable(
  'users',
  {
    id,
    name: t.varchar('name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    clerkUserId: t.text('clerk_user_id').unique(),
    createdAt,
    updatedAt,
  },
  (table) => [t.uniqueIndex('user_idx').on(table.id)],
);

export const BookingTable = t.pgTable(
  'bookings',
  {
    id,
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id)
      .notNull(),
    vanId: t
      .uuid('van_id')
      .references(() => VanTable.id)
      .notNull(),
    startDate: t.date('start_date').notNull(),
    endDate: t.date('end_date').notNull(),
    pricePerDayInCents: t.integer('price_per_day_in_cents').notNull(),
    totalInCents: t.integer('total_in_cents').notNull(),
    stripeSessionId: t.text('stripe_session_id').notNull().unique(),
    stripePaymentIntentId: t.text('stripe_payment_intent_id').unique(),
    status: BookingStatus('status').default('PENDING').notNull(),
  },
  (table) => [t.uniqueIndex('session_idx').on(table.stripeSessionId)],
);

export const ReviewTable = t.pgTable('reviews', {
  id,
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id)
    .notNull(),
  vanId: t
    .uuid('van_id')
    .references(() => VanTable.id)
    .notNull(),
  rating: t.integer('rating').notNull().default(1),
  body: t.text('body').notNull(),
  createdAt,
  updatedAt,
});

export const NewsletterSubscriptionTable = t.pgTable(
  'newsletter_subscription',
  {
    id,
    email: t.varchar('email', { length: 255 }).unique().notNull(),
    createdAt,
    updatedAt,
  },
);

export const ContactTable = t.pgTable('contacts', {
  id,
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  createdAt,
  updatedAt,
});

// relations
export const UserTableRelations = relations(UserTable, ({ many }) => ({
  bookings: many(BookingTable),
  reviews: many(ReviewTable),
}));

export const VanTableRelations = relations(VanTable, ({ many }) => ({
  bookings: many(BookingTable),
  reviews: many(ReviewTable),
}));

export const BookingTableRelations = relations(BookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [BookingTable.userId],
    references: [UserTable.id],
  }),
  van: one(VanTable, {
    fields: [BookingTable.vanId],
    references: [VanTable.id],
  }),
}));
