import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `Genera un documento especializado o una respuesta detallada para una solicitud administrativa, basándote en el siguiente prompt: "${prompt}". Asegúrate de que el contenido sea formal, claro y conciso, adecuado para una comunicación oficial.`,
      system:
        "Eres un asistente experto en redacción de documentos administrativos y respuestas a solicitudes. Tu objetivo es generar contenido profesional y preciso.",
    });

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error al generar con IA:", error);
    return NextResponse.json(
      { error: error.message || "Error al generar el documento con IA" },
      { status: 500 }
    );
  }
}
