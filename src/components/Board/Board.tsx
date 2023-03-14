import { FC } from "react";
//hooks
import { useBoard } from "@/hooks/useBoard";
//components
import { Cell } from "../Cell/Cell";
//styles
import styles from "./Board.module.css";

export const Board: FC = () => {
  const { board, setBoard } = useBoard();

  return (
    <div className={styles.board}>
      {
        board.map((row) => row.map((value) => <Cell value={value}/>))
      }
    </div>
  )
}
