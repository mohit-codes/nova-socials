import socketio from "socket.io-client";
import { BASE_URL } from "../utils/utility";
import React, { useContext } from "react";

export const socket = socketio(BASE_URL);
export const SocketContext = React.createContext();
export const useSocket = () => useContext(SocketContext);
