import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../service/store";
import { getItems } from "../../../service/Async/items";




export const Auction = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems())
    }, [dispatch])
    return (
        <div>
            <h1>Auction Page</h1>
            <img src="https://raw.githubusercontent.com/EXBO-Studio/stalcraft-database/main/ru/icons/weapon/assault_rifle/0r2g1.png" />
        </div>
    )
}