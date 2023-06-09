import { FC, useContext, useEffect, useState } from "react";
//components
import { Cell } from "../Cell/Cell";
//provider
import SocketContext from "@/context/SocketContext";
//styles
import styles from "./Board.module.css";

export const Board: FC = () => {

  const context = useContext(SocketContext);
  const { board, randomBall } = context;
  const [letter, setLetter] = useState("");
  
  const ballLetter = () => {
    if (randomBall > 0 && randomBall <= 15) {
      setLetter("B");
    }
    if (randomBall > 15 && randomBall <= 30) {
      setLetter("I");
    }
    if (randomBall > 30 && randomBall <= 45) {
      setLetter("N");
    }
    if (randomBall > 45 && randomBall <= 60) {
      setLetter("G");
    }
    if (randomBall > 60 && randomBall <= 75) {
      setLetter("O");
    }
  }

  useEffect(() => {
    ballLetter();
  }, [randomBall])
  
  return (
    <div className={styles.board}>
      {
        board?.map((row, boardIndex) => row.map((value, rowIndex) => <Cell value={value} key={ value } />))
      }
      {(randomBall > 0 && letter) && (
        <h1> {letter} { randomBall }</h1>  
      )
    }
    </div>
  )
}
