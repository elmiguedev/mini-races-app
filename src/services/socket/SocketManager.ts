import { Socket } from "socket.io-client";
import { io } from 'socket.io-client';

export type MessageType = "race_join" | "race_status" | "room_chat" | "player_ready";

export class SocketManager {

  private socket: Socket;
  private room: string;

  constructor(room: string) {
    this.room = room;
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('>> connected', this.socket.id);
      this.socket.emit('race_join', this.room);


    });

  }

  public on(message: MessageType, callback: (data: any) => void) {
    this.socket.on(message, callback);
  }

  public emit(message: MessageType, data: any) {
    console.log(">> emit del socket manager", message, data);
    this.socket.emit(message, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  // const socket = io();

  // socket.on('connect', () => {
  //   console.log('>> connected', socket.id);
  // })

  // socket.on('confirm_connection', () => {
  //   console.log('>> confirmed', socket.id);
  //   socket.emit('race_join', id);
  // });


  // socket.on("race_status", (status) => {
  //   console.log(">> race status", status);
  //   race.value = status;
  // })
}