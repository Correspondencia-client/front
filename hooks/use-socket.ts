import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

export const useSocket = (serverUrl: string) => {
  // const serverUrl =
  //   process.env.BACKEND_API_URL ?? "https://apico.eduadminsoft.shop";
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Crear conexión del socket
    socketRef.current = io(serverUrl, {
      transports: ["websocket"],
      autoConnect: true,
    });

    const socket = socketRef.current;

    // Eventos de conexión
    socket.on("connect", () => {
      console.log("Conectado al servidor Socket.IO");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor Socket.IO");
    });

    // Eventos personalizados que invalidan consultas de React Query
    socket.on("user_updated", (data) => {
      console.log("Usuario actualizado:", data);
      // Invalidar consultas relacionadas con usuarios
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", data.userId] });
    });

    socket.on("post_created", (data) => {
      console.log("Post creado:", data);
      // Invalidar consultas de posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "recent"] });
    });

    socket.on("post_updated", (data) => {
      console.log("Post actualizado:", data);
      // Invalidar consulta específica del post
      queryClient.invalidateQueries({ queryKey: ["post", data.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });

    socket.on("post_deleted", (data) => {
      console.log("Post eliminado:", data);
      // Remover del cache y invalidar lista
      queryClient.removeQueries({ queryKey: ["post", data.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });

    socket.on("notification_received", (data) => {
      console.log("Notificación recibida:", data);
      // Invalidar consultas de notificaciones
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    });

    // Cleanup al desmontar
    return () => {
      socket.disconnect();
    };
  }, [serverUrl, queryClient]);

  return socketRef.current;
};
