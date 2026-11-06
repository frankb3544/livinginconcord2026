import { z } from "zod";

export const schema = z.object({});

export const getPdfGuide = async (init?: RequestInit): Promise<Blob> => {
  const result = await fetch(`/_api/guide/pdf`, {
    method: "GET",
    ...init,
  });

  if (!result.ok) {
    const errorObject = await result.json().catch(() => ({ error: "Failed to download PDF" }));
    throw new Error(errorObject.error || "Failed to download PDF");
  }

  return await result.blob();
};