import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const EmailInputSchema = z.object({
  context: z.string().trim().min(1).max(4000),
  recipient: z.string().trim().max(200).optional().default(""),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

const toneInstructions: Record<z.infer<typeof EmailInputSchema>["tone"], string> = {
  Formal:
    "Use a polished, professional, respectful business tone. Keep the wording refined and precise without sounding cold.",
  Friendly:
    "Use a warm, casual, natural tone. Strictly avoid corporate jargon, stiff phrasing, buzzwords, and overly formal language.",
  Persuasive:
    "Use a confident, compelling tone with a clear value-focused call to action while staying credible and human.",
};

export const generateEmailDraft = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      throw new Error("Email generation is unavailable right now. Please try again shortly.");
    }

    const gateway = createLovableAiGatewayProvider(key);
    const recipientLine = data.recipient
      ? `Recipient or recipient context: ${data.recipient}`
      : "Recipient or recipient context: not specified";

    const { text } = await generateText({
      model: gateway.chatModel("google/gemini-3-flash-preview"),
      system:
        "You are GlowDesk AI, an expert workplace email-writing assistant. Draft fully custom emails from the user's actual request. Never copy the user's raw notes as the body, never use placeholder template scenarios, and never invent unrelated facts, names, dates, delays, reports, or events. Return only the finished email text with a subject line, greeting, body, closing, and [Your Name] signature.",
      prompt: `Write a complete email from scratch using the details below.

Tone selected: ${data.tone}
Tone rule: ${toneInstructions[data.tone]}
${recipientLine}

User's email request / raw context:
"""
${data.context}
"""

Requirements:
- Interpret the user's intent and transform it into a polished email.
- Stay strictly about the user's supplied topic and purpose.
- If the user asks an inquiry, draft a clear inquiry email.
- If information is missing, keep it general instead of inventing specifics.
- Format exactly as:
Subject: ...

Greeting,

Email body paragraphs...

Closing,

[Your Name]`,
    });

    const draft = text.trim();
    if (!draft) {
      throw new Error("The email draft came back empty. Please try again.");
    }

    return { draft };
  });