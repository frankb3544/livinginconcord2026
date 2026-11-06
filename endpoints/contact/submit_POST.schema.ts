import { z } from "zod";
import superjson from "superjson";

export const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional().nullable(),
  interestedIn: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  motivation: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  sourceNeighborhood: z.string().optional().nullable(),
  qualifierVariant: z.string().optional().nullable(),
  preferredCallTime: z.string().optional().nullable(),
});

export type InputType = z.infer<typeof schema>;

export type OutputType = {
  success: boolean;
};

export const postContactSubmit = async (
  body: InputType,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/contact/submit`, {
    method: "POST",
    body: superjson.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!result.ok) {
    const errorObject = superjson.parse<{ error: string }>(await result.text());
    throw new Error(errorObject.error);
  }
  return superjson.parse<OutputType>(await result.text());
};