import { FC } from 'react'
//styles
import styles from "./Cell.module.css"

interface Props {
    value: number;
}

export const Cell:FC<Props> = ({ value }) => {
    return <div className={styles.cell}>{value}</div>
}
