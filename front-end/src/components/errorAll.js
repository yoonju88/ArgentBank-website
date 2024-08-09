import { useEffect } from "react"
import {  useNavigate } from "react-router-dom"


function ErrorAll () {
    const navigate = useNavigate()

    useEffect(() => {      
           navigate("/error")
    }, [navigate])

    return(
        <></>
    )
}

export default ErrorAll