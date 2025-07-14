import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

export const statusConfig = {
  PENDING: {
    title: "Pendientes",
    color: "bg-gray-50 border-gray-200",
    headerColor: "bg-gray-500",
    bgColor: "bg-gray-100 text-gray-800 ring-gray-400",
    icon: AlertCircle,

    badgeColor: "bg-red-100 text-red-800",
  },
  IN_REVIEW: {
    title: "En Revisión",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-yellow-500",
    bgColor: "bg-yellow-50 text-yellow-800 ring-yellow-400",
    icon: Clock,
    badgeColor: "bg-yellow-100 text-yellow-800",
  },
  COMPLETED: {
    title: "Completadas",
    color: "bg-green-50 border-green-200",
    headerColor: "bg-green-500",
    bgColor: "bg-green-100 text-green-800 ring-green-400",
    icon: CheckCircle,
    badgeColor: "bg-green-100 text-green-800",
  },
  OVERDUE: {
    title: "Vencidas",
    color: "bg-red-50 border-red-200",
    headerColor: "bg-red-500",
    bgColor: "bg-red-100 text-red-800 ring-red-400",
    icon: XCircle,
    badgeColor: "bg-gray-100 text-gray-800",
  },
};
