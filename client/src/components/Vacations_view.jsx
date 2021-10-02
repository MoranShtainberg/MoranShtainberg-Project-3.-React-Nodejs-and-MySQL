import React, { useEffect, useState } from 'react'
import jwt from "jsonwebtoken"
import Nav from './Nav'
import Vac_Item from './Vac_Item'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Grid } from '@material-ui/core'


export default function Vacations_view({ history }) {

    const userInfo = useSelector(state => state.userInfo)
    // console.log(userInfo);
    const dispatch = useDispatch();

    const [vacationsArr, setVacationsArr] = useState([])
    const [update, setUpdate] = useState(false)

    // console.log(jwt.decode(localStorage.token));
    //------------------------------------------------post (add/remove follow)-----

    const followHandler = async (followSwitch, Vac_id) => {
        try {
            const res = await fetch('http://localhost:1000/vacations_view', {
                method: "POST",
                body: JSON.stringify({ followSwitch, Vac_id }),
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.token
                }
            })

            // const data = await res.json()
            // console.log(data)
            // setVacationsArr(data)

            if (res.status === 201) {
                setUpdate(!update)
            }

        } catch (error) {
            console.log(error)
        }
    }
    //------------------------------------------------Delete-----------------------
    const del_vacation = async (Vac_id) => {
        try {
            const res = await fetch('http://localhost:1000/vacations_view', {
                method: "DELETE",
                body: JSON.stringify({ Vac_id }),
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.token
                }
            })

/*             const data = await res.json();
            console.log(data);
            setVacationsArr(data); */

            if (res.status === 200) {
                setUpdate(!update)
            }
        } catch (error) {
            console.log(error)
        }

    }

    //-------------------------------------------------useEffect-------------------
    useEffect(() => {

        if (!localStorage.token) {
            history.push('/login')
        }

        //when the user dont have a token in the localstorage
        if (!localStorage.token) {
            history.push('/login')
        } else {
            let decoded = jwt.decode(localStorage.token);
            console.log(decoded);

            if (decoded.exp * 1000 < new Date().getTime()) {
                history.push('/login')
            }
        }

        //Dispatch
        dispatch({
            type: "USER_INFO",
            first_name: jwt.decode(localStorage.token).first_name,
            isAdmin: jwt.decode(localStorage.token).isAdmin,
            expirty: jwt.decode(localStorage.token).exp,
            user_id: jwt.decode(localStorage.token).user_id,
        })

        const fetchVacationsArr = async () => {
            try {
                const res = await fetch('http://localhost:1000/vacations_view', {
                    method: "GET",
                    headers: {
                        "authorization": localStorage.token
                    }
                });

                const data = await res.json();
                console.log(data);

                setVacationsArr(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchVacationsArr();
    }, [update]);

    //-----------------------------------------------return------------------------------------
    return (
        <Container>
            <Nav />

            <h1>Vacations page</h1>

            <Grid container spacing={1} >
                {vacationsArr.map((single_vac) => (
                    <Grid item key={single_vac.Vac_id} xs={12} md={6} lg={3} >
                        <Vac_Item single_vac={single_vac} followHandler={followHandler} del_vacation={del_vacation} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
