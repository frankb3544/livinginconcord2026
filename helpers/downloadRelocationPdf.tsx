import { generateRelocationPdf } from "./generateRelocationPdf";

/**
 * Downloads the relocation guide PDF.
 * Checks if an uploaded PDF exists in the database first.
 * If found, downloads that. Otherwise falls back to generating one with pdfmake.
 */
export async function downloadRelocationPdf(): Promise<void> {
  console.log("Attempting to download relocation guide PDF...");

  try {
    const response = await fetch("/_api/guide/pdf", { method: "GET" });

    if (response.ok) {
      console.log("Uploaded guide found, downloading from server.");
      const blob = await response.blob();

      // Extract filename from Content-Disposition header if available
      const disposition = response.headers.get("Content-Disposition");
      let filename = "Moving_to_Concord_Guide.pdf";
      if (disposition) {
        const match = disposition.match(/filename="?([^";\n]+)"?/);
        if (match && match[1]) {
          filename = match[1].trim();
        }
      }

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      return;
    }

    // 404 means no guide uploaded yet — fall back to pdfmake generation
    if (response.status === 404) {
      console.log("No uploaded guide found (404), falling back to pdfmake generation.");
      generateRelocationPdf();
      return;
    }

    // Any other non-ok status: log and fall back
    console.warn(`Unexpected response status ${response.status} when fetching guide PDF. Falling back to pdfmake.`);
    generateRelocationPdf();
  } catch (error) {
    console.warn("Failed to fetch uploaded guide PDF, falling back to pdfmake:", error);
    generateRelocationPdf();
  }
}