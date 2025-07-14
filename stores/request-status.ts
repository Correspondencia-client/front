import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RequestStatus } from "@/types/requests";

interface RequestStatusState {
  status: RequestStatus | null;
  setStatus: (status: RequestStatus) => void;
}

export const useRequestStatusStore = create<RequestStatusState>()(
  persist(
    (set) => ({
      status: null,
      setStatus: (status) => set({ status }),
    }),
    {
      name: "request-status-storage",
    }
  )
);
