import { Socket } from "socket.io-client";
import { io } from 'socket.io-client';

export type MessageType = "race_join" | "race_status" | "room_chat" | "player_ready" | "player_in_race" | "player_move";

export class SocketManager {
  private static instance: SocketManager;
  public static getInstance() {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  private socket: Socket | undefined;
  private room!: string;

  private constructor() {

  }

  public join(room: string) {
    this.room = room;
    this.socket = io();
    this.socket.on('connect', () => {
      console.log('>> connected', this.socket!.id);
      this.socket!.emit('race_join', this.room);
    });
  }

  public on(message: MessageType, callback: (data: any) => void) {
    if (!this.socket) return;
    this.socket.on(message, callback);
  }

  public emit(message: MessageType, data: any) {
    if (!this.socket) return;
    this.socket.emit(message, data);
  }

  public disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = undefined;
  }

  public getId() {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }
    return this.socket.id
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