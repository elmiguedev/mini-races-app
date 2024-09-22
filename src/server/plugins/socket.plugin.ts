import type { NitroApp } from "nitropack";
// @ts-ignore
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { initializeSocket } from "../socket";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  // const io = new Server();
  const httpServer = nitroApp.h3App;
  const io = initializeSocket(httpServer);

  io.bind(engine);

  io.on("connection", (socket) => {
    console.log(">> cliente conectado", socket.id);
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});