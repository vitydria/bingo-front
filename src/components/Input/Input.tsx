import { FC, HTMLInputTypeAttribute } from "react";
//styles
import styles from "./Input.module.css";

interface Props {
    label: string;
    type: HTMLInputTypeAttribute | undefined;
}

export const Input:FC<Props> = ({ label, type }) => {
    return (
      <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input className={styles.input} type={type} />  
      </div>
     )
}
