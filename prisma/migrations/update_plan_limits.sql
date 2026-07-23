-- Update existing Pro and Enterprise subscriptions to latest limits
-- Pro: 200 listings/month
UPDATE "Subscription" SET "listingsLimit" = 200 WHERE "stripePriceId" = 'price_1Ttkg8FqNlRS41IKveeEg5cR';

-- Enterprise: 1000 listings/month
UPDATE "Subscription" SET "listingsLimit" = 1000 WHERE "stripePriceId" = 'price_1TwK42FqNlRS41IKVTImIvBq';
