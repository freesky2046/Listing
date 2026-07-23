import { auth } from "@/lib/auth/server";
import { getOrCreateSubscription } from "@/lib/subscription";
import { ListingClient } from "./ListingClient";

// Force dynamic rendering so quota data is always fresh.
// A change in `initialUsed` triggers the client useEffect to sync local state.
export const dynamic = "force-dynamic";

export default async function ListingPage() {
  const session = await auth.getSession();
  const user = session?.data?.user ?? null;

  let used = 0;
  let limit = 5;

  if (user?.id) {
    const sub = await getOrCreateSubscription(user.id);
    used = sub.listingsUsed;
    limit = sub.listingsLimit;
  }

  // Key on used+limit so after webhook updates (used=0), React mounts a fresh instance
  const key = `${used}-${limit}`;

  return (
    <ListingClient
      key={key}
      initialUsed={used}
      initialLimit={limit}
    />
  );
}
