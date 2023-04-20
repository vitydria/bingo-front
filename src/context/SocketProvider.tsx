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


function checkWin(table:number[][],numbers : number[], mode:string) {
  const validDigit = (digit:number) => digit == -1 || numbers.includes(digit);
  const indices = [0, 1, 2, 3, 4];
  if ( mode === 'FULL') {
    return table.flat().every( d => validDigit(d) )
  } 
  for (let i = 0; i < 5; i++) {
    // checks column (x,i)
    if (indices.every((idx) => validDigit(table[idx][i]))) {
      return true;
    }
    // check row (i,x)
    if (table[i].every(validDigit)) {
      return true;
    }
  }
  // checks diags
  if (
    indices.every((idx) => validDigit(table[idx][idx])) ||
    indices.every((idx) => validDigit(table[4 - idx][idx]))
  ) {
    return true;
  }
  return false;
}

const SocketProvider = ({ children }: any) => {
  
  const [socket, setSocket] = useState<Socket | any>();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [clientsConnected, setClientsConnected] = useState<number>(0);
  const [randomBall, setRandomBall] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const [winner,setWinner] = useState<Boolean | null>(null)
  const [gameAlreadyOn,setGameAlreadyOn] = useState(false)
  const [gameHasStarted,setGameHasStarted] = useState(false)

  const [mode,setMode] = useState('NORMAL')

  const [numbersGenerated,setNumbersGenerated] = useState<number[]>([])

  const [isSavedPlayer, setIsSavedPlayer] = useState(false);
  const [isHost, setIsHost] = useState(false);
  
  const [openGameMode, setOpenGameMode] = useState({
    isSaved: false,
    mode: "",
  });

  const [board, setBoard] = useState<any[]>([]);

  const url = "http://201.208.159.77/socket.io/socket.io.js";

  const handleSocket = () => {
    if(!socket) {

      const managet = new Manager(url);
  
      const socket = managet.socket("/");
  
      setSocket(socket);
      return
    }



    addListeners(socket, (data: any) => {
      
      if( data.type === 'win-announced' ) {
        setWinner(true)
      }

      if( data.type === 'joined-game' ) {
        setIsSavedPlayer(true);
        setIsHost(false)
      }

      if( data.type === 'lobby-closed' ) {
        setMode(data.mode)
      }

      if(  data.type === 'game-already-on' ) {
        setGameAlreadyOn(true)
      }

      if(  data.type === 'game-has-started' ) {
        setGameHasStarted(true)
      }

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

        setBoard(data.table)
      }

      if (data.randomBall) {
        setNumbersGenerated([...numbersGenerated,data.randomBall.ball])
        setRandomBall(data.randomBall.ball)
       
        if(board && board.length == 5 && board[0]  && board[0].length == 5) {
          if(checkWin(board,[...numbersGenerated,data.randomBall.ball],mode)) {
            socket.emit('claim-win')
          }
        }
      }
    }); 
  };



  useEffect(() => { 
    handleSocket();

    return () => {
      if(!socket) {
        return
      }

      socket.off('clients-connected')
      socket.off('save-player')
      socket.off('table-assigned')
      socket.off('num-announced')
      socket.off('disconnect')
      socket.off('messages-from-server')
      socket.off('win-announced')
      socket.off('joined-game')
      socket.off('game-already-on')
      socket.off('lobby-closed')
      socket.off('game-has-started')

    }
  }, [numbersGenerated,setNumbersGenerated,socket,board,mode,setMode]);

  const handlePlayerName = (name: string) => {
    
    // emitSavePlayerMessage(socket, name);
    socket.emit('request-game',{
      playerName:name
    })

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
    socket,
    board,
    numbersGenerated,
    handleBoard,
    randomBall,
    winner,
    gameAlreadyOn,
    gameHasStarted
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
