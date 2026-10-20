import { intakeAsText, intakeConfigured, loadIntake, roleForKey, saveIntake } from "@/lib/intake";

export const dynamic = "force-dynamic";

const MAX_BODY = 300_000;

function fileUrl(origin: string, key: string) {
  return (pathname: string) => `${origin}/api/intake/file?k=${encodeURIComponent(key)}&p=${encodeURIComponent(pathname)}`;
}

/** Read the answers. `?format=text` returns plain text (developer key only). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("k");
  const role = roleForKey(key);
  if (!role) return Response.json({ error: "This link isn't valid." }, { status: 401 });
  if (!intakeConfigured()) return Response.json({ error: "Storage isn't set up yet." }, { status: 503 });

  const data = await loadIntake();
  if (url.searchParams.get("format") === "text" && role === "admin") {
    return new Response(intakeAsText(data, fileUrl(url.origin, key!)), {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }
  return Response.json(data, { headers: { "cache-control": "no-store" } });
}

/** Save changed answers: `{ answers: { [questionId]: answer }, submit?: boolean }`. */
export async function PUT(request: Request) {
  const key = new URL(request.url).searchParams.get("k");
  if (!roleForKey(key)) return Response.json({ error: "This link isn't valid." }, { status: 401 });
  if (!intakeConfigured()) return Response.json({ error: "Storage isn't set up yet." }, { status: 503 });

  const text = await request.text();
  if (text.length > MAX_BODY) return Response.json({ error: "Too much at once." }, { status: 413 });
  let body: { answers?: unknown; submit?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  const answers = body.answers && typeof body.answers === "object" ? (body.answers as Record<string, unknown>) : {};
  const data = await saveIntake(answers, body.submit === true);
  console.log(`[intake] saved ${Object.keys(answers).length} answer(s)${body.submit === true ? ", sent" : ""}`);
  return Response.json({ updatedAt: data.updatedAt, submittedAt: data.submittedAt });
}
