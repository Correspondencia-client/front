import api from "@/lib/axios";
import { AxiosError } from "axios";

export interface DownloadExcelParams {
  radicado?: string;
  subject?: string;
  status?: "PENDING" | "IN_REVIEW" | "COMPLETED" | "OVERDUE";
  type?: "internal" | "external";
  startDate?: string;
  endDate?: string;
}

export async function downloadUnifiedExcelReport(
  params: DownloadExcelParams
): Promise<Blob> {
  try {
    const response = await api.get("/requests/reportes/excel", {
      params,
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const contentType = error.response?.headers["content-type"];

      if (contentType?.includes("application/json")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result as string);
            throw new Error(
              json.message || "Error desconocido al generar el reporte."
            );
          } catch {
            throw new Error("Error inesperado en el contenido de respuesta.");
          }
        };
        reader.readAsText(error.response!.data);
        throw new Error("No se pudo procesar el error del servidor.");
      }

      throw new Error(
        "Error en la respuesta del servidor al generar el Excel."
      );
    }

    throw new Error("Error inesperado al generar el reporte.");
  }
}
