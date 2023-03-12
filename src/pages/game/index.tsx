//next
import { NextPage } from "next";
//components
import { Board } from "@/components/Board/Board";
//styles
import styles from '../../styles/Game.module.css'

const index:NextPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Bingo</h1>
      <Board />
    </div>
  )
}

export default index;
