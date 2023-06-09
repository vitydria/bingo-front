import { useEffect, useState } from "react";
// Context
import SocketContext from "./SocketContext";
// Socket
import { Manager, Socket } from "socket.io-client";
//utils
import {
  addListeners,
  emitSavePlayerMessage,
  emitGameModeMessage,
  emitBoard,
  emitRandomBall,
} from "@/utils/listeners";

const SocketProvider = ({ children }: any) => {
  
  const [socket, setSocket] = useState<Socket | any>();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [clientsConnected, setClientsConnected] = useState<number>(0);
  const [randomBall, setRandomBall] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");

  const [isSavedPlayer, setIsSavedPlayer] = useState(false);
  const [isHost, setIsHost] = useState(false);
  
  const [openGameMode, setOpenGameMode] = useState({
    isSaved: false,
    mode: "",
  });

  const [board, setBoard] = useState<any[]>([]);

  const url = "localhost:3000/socket.io/socket.io.js";

  const handleSocket = () => {
    const managet = new Manager(url);

    const socket = managet.socket("/");

    setSocket(socket);

    addListeners(socket, (data: any) => {
      
      if (data.type === "socket-connection") {
        setSocketConnected(data.isSocketConnected);
        setClientsConnected(data.clientsNumber);
      }

      if (data.type === "saved-player") {
        setIsSavedPlayer(data.isSaved);
        setIsHost(data.isHost)
      }

      if (data.type === "saved-game-mode") {
        setOpenGameMode({
          mode: data.mode,
          isSaved: data.isSaved,
        });

        setBoard(prevState => [...prevState, ...data.table])
      }

      if (data.randomBall) {
        setRandomBall(data.randomBall.ball)
      }
    }); 
  };

  useEffect(() => { 
    handleSocket();
  }, []);
    
  const handlePlayerName = (name: string) => {
    emitSavePlayerMessage(socket, name);
  };

  const handleMode = (mode: string) => {
    emitGameModeMessage(socket, mode);
  };

  const handleBoard = (socket: Socket) => {
    emitBoard(socket);
  }

  const context:any = {
    handleSocket,
    playerName,
    setPlayerName,
    handlePlayerName,
    handleMode,
    socketConnected,
    clientsConnected,
    isSavedPlayer,
    isHost,
    openGameMode,
    board,
    handleBoard,
    randomBall
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
