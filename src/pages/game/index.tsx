import { NextPage } from "next"
//styles
import styles from '../../styles/Game.module.css'

const index:NextPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Bingo</h1>
    </div>
  )
}

export default index;
