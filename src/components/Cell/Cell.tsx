import { FC } from "react";
//styles
import styles from "./Cell.module.css";

interface Props {
  value: number | string;
  mark?: boolean;
}

export const Cell: FC<Props> = ({ value, mark = false }) => {
  if (mark) {
    const s = {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "tomato",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color:'white'
    };
    return (
      <div className={styles.cell} >
        <div style={s}>{value}</div>
      </div>
    );
  }

  if (value === -1) {
    return <div className={styles.cell}></div>;
  } else {
    return <div className={styles.cell}>{value}</div>;
  }
};
