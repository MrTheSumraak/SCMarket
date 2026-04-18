import { useEffect, useState } from "react"
import { type AppDispatch } from "../../../service/store"
import { useDispatch, useSelector } from "react-redux"
import { getTokenUser } from "../../../service/Async/auth";
import { useNavigate } from "react-router-dom";
import { isUserData } from "../../../service/slices/user.slice";

export const Code = () => {
    const dispatch:AppDispatch = useDispatch();

    const [getToken, setToken] = useState<string | null>(null);
    const userData = useSelector(isUserData)

    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search);
        const getParamsToken = token.get('code');
        setToken(getParamsToken);

        if(getParamsToken === null){
            navigate('/auth')
        }
        
    }, [])

    useEffect(() => {        
        if(typeof getToken === "string"){
            dispatch(getTokenUser({code: getToken}))
        }
    },[getToken])

    useEffect(() => {
        if(userData !== null){
            navigate('/market')
        }
    }, [isUserData])
    return(
        <>
                <p>Пожалуйста, подождите, проходит авторизация</p>
        </>
    )
}