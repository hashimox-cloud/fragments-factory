import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("counter");
  let count = 0;

  try {
    const current = await store.get("visits", { type: "text" });
    count = current ? parseInt(current, 10) : 0;
  } catch (e) {
    count = 0;
  }

  count += 1;

  try {
    await store.set("visits", String(count));
  } catch (e) {
    // if write fails, still return the read value
  }

  return new Response(JSON.stringify({ count }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
};

export const config = {
  path: "/api/visit",
};
