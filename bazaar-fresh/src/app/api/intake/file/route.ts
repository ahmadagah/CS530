import { readIntakeFile, roleForKey } from "@/lib/intake";

export const dynamic = "force-dynamic";

/** Serves one uploaded file from the private store to someone holding a valid link key. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!roleForKey(url.searchParams.get("k"))) return new Response("This link isn't valid.", { status: 401 });
  const file = await readIntakeFile(url.searchParams.get("p") ?? "");
  if (!file) return new Response("Not found.", { status: 404 });
  const name = file.blob.pathname.split("/").pop() ?? "file";
  return new Response(file.stream, {
    headers: {
      "content-type": file.blob.contentType,
      "content-length": String(file.blob.size),
      "content-disposition": `${url.searchParams.get("download") ? "attachment" : "inline"}; filename="${name.replace(/"/g, "")}"`,
      "cache-control": "private, max-age=3600",
    },
  });
}
