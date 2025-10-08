// app/api/posts/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function ensureDepth2(url: URL) {
  if (!url.searchParams.has("depth")) {
    url.searchParams.set("depth", "2");
  }
}

type Author = {
  name?: string;
  fullName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: { url?: string } | null;
  avatarUrl?: string | null;
  image?: { url?: string } | null;
  photo?: { url?: string } | null;
};

function normalizeAuthors(p: any) {
  const raw: Author[] =
    (Array.isArray(p.authors) && p.authors.length ? p.authors : []) ||
    (p.author ? [p.author] : []) ||
    (p.createdBy ? [p.createdBy] : []) ||
    (p.owner ? [p.owner] : []);

  const mapped = raw.map((a) => {
    // break up nullish/fallback logic to avoid mixing ?? and ||
    const primary =
      a?.name ?? a?.fullName ?? a?.username ?? null;

    const full = [a?.firstName, a?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const name = primary ?? (full !== "" ? full : "");

    const avatarUrl =
      a?.avatar?.url ??
      a?.image?.url ??
      a?.photo?.url ??
      (typeof a?.avatarUrl === "string" ? a.avatarUrl : undefined);

    return name
      ? { name, avatar: avatarUrl ? { url: avatarUrl } : null }
      : null;
  }).filter(Boolean) as { name: string; avatar: { url: string } | null }[];

  // final fallback
  return mapped.length ? mapped : [{ name: "Tristan Smith", avatar: null }];
}

export async function GET(request: Request) {
  try {
    const clientUrl = new URL(request.url);

    const upstreamBase =
      process.env.PAYLOAD_URL ||
      process.env.NEXT_PUBLIC_PAYLOAD_API_URL ||
      "";
    if (!upstreamBase) {
      console.error("Missing Payload URL env var");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    // Enforce depth=2 unless caller overrides
    ensureDepth2(clientUrl);

    // Build upstream URL & copy query
    const upstream = new URL(`${upstreamBase.replace(/\/$/, "")}/api/posts`);
    clientUrl.searchParams.forEach((v, k) => upstream.searchParams.set(k, v));

    // Timeout guard
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 10_000);

    const res = await fetch(upstream.toString(), {
      method: "GET",
      signal: ac.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Upstream error", res.status, await res.text());
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }

    const json = await res.json();

    // Normalize authors server-side for consistent shape
    const docs = Array.isArray(json?.docs)
      ? json.docs.map((p: any) => ({
          ...p,
          authors: normalizeAuthors(p),
        }))
      : [];

    return NextResponse.json(
      { ...json, docs },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: any) {
    const msg = err?.name === "AbortError" ? "Upstream timeout" : "Unexpected error";
    console.error(msg, err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}
