import { FC, useContext } from "react";
//hooks
import { useBoard } from "@/hooks/useBoard";
//components
import { Cell } from "../Cell/Cell";
//provider
import SocketProvider from "@/context/SocketProvider";
//styles
import styles from "./Board.module.css";
import SocketContext from "@/context/SocketContext";

export const Board: FC = () => {
  const context = useContext(SocketContext)
  const { board } = context;
  console.log("tetrahijueupta board: ", board);

  return (
    <div className={styles.board}>
      {
        board?.map((row, boardIndex) => row.map((value, rowIndex) => <Cell value={value} key={ value } />))
      }
    </div>
  )
}
