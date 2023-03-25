import { useState } from "react"
//utils
import { generateRandomCell } from "@/utils/board";
import { addListeners } from "@/utils/listeners";


export const useBoard = () => {
    const [board, setBoard] = useState<[number[], number[], number[], number[], number[]]>([[1,3,8,11,14], [16,19,23,30,18], [38,40,45,41,42], [50,57,49,52,54], [70,73,68,64,62]]);
    return {board, setBoard};
}
