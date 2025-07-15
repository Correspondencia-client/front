import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, request } = await req.json();
  if (!prompt)
    return NextResponse.json({ error: "Prompt requerido" }, { status: 400 });

  // Extraer información relevante del objeto request para enriquecer el prompt
  let requestInfo = "";
  if (request) {
    requestInfo = `
Información completa de la solicitud en formato JSON:
${JSON.stringify(request, null, 2)}
`;
  }

  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash", {
        // @ts-expect-error: apiKey sí es aceptado por el SDK aunque el tipo no lo declare
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      }),
      prompt: `${prompt}

Utiliza la siguiente información de la solicitud (en formato JSON) para redactar el documento solicitado. 
No incluyas IDs ni campos técnicos, solo información relevante y presentable. 
El resultado debe estar en HTML profesional, bien estructurado, con títulos, párrafos y tablas si es necesario. 
No incluyas explicaciones, solo el HTML.

Información de la solicitud:
${JSON.stringify(request, null, 2)}
`,
      system:
        "Eres un asistente experto en redacción de documentos administrativos y respuestas a solicitudes. Tu objetivo es generar contenido profesional, claro y bien presentado.",
    });
    return NextResponse.json({ text });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al generar texto" },
      { status: 500 }
    );
  }
}
