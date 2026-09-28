import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const store = getStore("counter");

    let count = 0;
    try {
      const current = await store.get("visits", { type: "text" });
      count = current ? parseInt(current, 10) : 0;
      if (isNaN(count)) count = 0;
    } catch (e) {
      count = 0;
    }

    count += 1;
    await store.set("visits", String(count));

    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 0, error: String(err) }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

export const config = {
  path: "/api/visit",
};
