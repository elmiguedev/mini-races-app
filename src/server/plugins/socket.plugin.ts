// @ts-ignore
import { Server as Engine } from "engine.io";
import type { NitroApp } from "nitropack";
import { defineEventHandler } from "h3";
import { SocketServer } from "../sockets/SocketServer";
import { defineNitroPlugin } from "../../../node_modules/.pnpm/nitropack@2.9.7/node_modules/nitropack/dist/runtime"

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const httpServer = nitroApp.h3App;
  const socketServer = new SocketServer(httpServer, engine);

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