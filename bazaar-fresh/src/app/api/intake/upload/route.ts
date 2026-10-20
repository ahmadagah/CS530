import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { roleForKey } from "@/lib/intake";
import { INTAKE_FILE_PREFIX } from "@/lib/intake-types";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = [
  "image/*",
  "application/pdf",
  "text/csv",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

/** Hands the browser a short-lived token so files upload straight to the private Blob store. */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!roleForKey(clientPayload)) throw new Error("This link isn't valid.");
        if (!pathname.startsWith(INTAKE_FILE_PREFIX) || pathname.includes("..")) throw new Error("Bad file name.");
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }
}
