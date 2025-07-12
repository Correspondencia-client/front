import api from "@/lib/axios";
import { CitizenRequestFormValues } from "@/schemas/request";

export const createCitizenRequest = async (data: CitizenRequestFormValues) => {
  const payload = {
    subject: data.title,
    content: {
      texto: data.description,
    },
    procedureId: data.procedureId,
  };

  const response = await api.post("/requests", payload);
  return response.data;
};