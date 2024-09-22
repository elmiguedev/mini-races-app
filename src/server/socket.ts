import { Server } from "socket.io";

let io: Server | null = null;

export const initializeSocket = (httpServer: any) => {
  if (io) return io; // Evitar múltiples inicializaciones
  io = new Server(httpServer);
  return io;
};

export const getSocket = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};