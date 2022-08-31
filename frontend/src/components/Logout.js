import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App"

const Logout = () => {

    const { state, dispatch } = useContext(userContext)

    const navigate = useNavigate();

    const logoutClick = async () => {

        try {
            const res = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (res.status === 401) {
                throw new Error("internal server error occured")
            } else {
                dispatch({ type: 'authenticate', payload: false })
                navigate('/login', { replace: true })
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        logoutClick();
    }, [])

    return (
        <>
        </>
    )
}

export default Logout
