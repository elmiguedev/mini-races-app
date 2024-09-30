import { Socket } from "socket.io";
import { getSocket } from "../socket";
import { defineEventHandler, getQuery } from "h3"

export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log(">> el cliente manda un mensaje: ", query.text);
  // @ts-ignore
  const io = getSocket();
  io.emit("message", query.text);
  return {
    message: query.text
  }
})  