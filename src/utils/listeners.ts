import { Socket } from "socket.io-client";

export const addListeners = (socket: Socket, callBack: Function) => {



  //ver clientes conectados
  socket.on("clients-connected", (e: any) => {
    console.log(e);
    console.log("connected");
    callBack({
      isSocketConnected: true,
      type: "socket-connection",
      clientsNumber: e.length,
    });
  });

  socket.on('joined-game',()=> {
    callBack({  type: "joined-game" });
  })


  socket.on('lobby-closed',(payload)=> {
    callBack({  mode:payload.mode,type: "lobby-closed" });
  })


  socket.on('game-has-started',()=> {
    callBack({  type: "game-has-started" });
  })

  socket.on('game-already-on',()=> {
    callBack({  type: "game-already-on" });
  })

  // guardar jugador
  socket.on("save-player", (e: any) => {
    callBack({ isSaved: true, type: "saved-player" });
  });

  socket.on("win-announced", (payload) => {
    callBack({  type: "win-announced" });
  });

  // guardar modo de juego

  socket.on("table-assigned", (e: any) => {
    callBack({
      isSaved: true,
      type: "saved-game-mode",
      mode: e.gameMode,
      table: e.table,
    });
  });



  socket.on("num-announced", (payload) => {
    callBack({ randomBall: { ball: payload.number } });
  });

  //obtener tabla

  //ver tabla asignada
  // socket.on("create-table", (e: any) => {
  //   console.log("my fuckin table: ", e);
  //   callBack({ isSaved: true, type: "create-table", table: e.table.table });
  // });

  // desconectar usuario
  socket.on("disconnect", (e: any) => {
    console.log(e);
    console.log("disconnected");
    callBack({ isSocketConnected: false, type: "socket-connection" });
  });

  //   messageForm.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     if (messageInput.value.trim().length <= 0) return;

  //     socket.emit("message-from-client", {
  //       mode: "FULL",
  //     });

  //     messageInput.value = "";
  //   });

  socket.on(
    "messages-from-server",
    (payload: { fullName: string; message: string }) => {
      console.log(payload);
    }
  );
};

// guardar datos de usuario
export const emitSavePlayerMessage = (socket: Socket, playerName: string) => {
  socket.emit("message-from-client", {
    playerName,
    isSavePlayer: true,
  });
};

// guardar modo de juego
export const emitGameModeMessage = (socket: Socket, mode: string) => {
  socket.emit("message-from-client", {
    mode,
    isGameMode: true,
  });
};

export const emitBoard = (socket: Socket) => {
  socket.emit("message-from-client"),
    {
      isCreatedTable: true,
    };
};

export const emitRandomBall = (socket: Socket) => {
  socket.emit("message-from-client"),
    {
      isGameStarted: true,
    };
};
