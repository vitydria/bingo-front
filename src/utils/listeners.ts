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

  // guardar jugador
  socket.on("save-player", (e: any) => {
    const { isHost } = e;
    callBack({ isSaved: true, type: "saved-player", isHost });
  });

  // guardar modo de juego
  socket.on("save-game-mode", (e: any) => {
    console.log(e);
    callBack({ isSaved: true, type: "saved-game-mode", mode: e.gameMode });
  });

  //ver tabla asignada
  socket.on("create-table", (e: any) => {
    console.log("my fuckin table: ", e);
    callBack({ isSaved: true, type: "create-table", table: e.table.table });
  });

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
