import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));
//-------------------------------------------------export--------------------
export default function Login({history}) {
    const classes = useStyles();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    //-------------------------------------------return---------------------
    return (
        <Container>
            <div>
                <h1>Login</h1>
                <FlightTakeoffIcon style={{ fontSize: 50 }}/>

                {errorMsg && <h1>Err:{errorMsg}</h1>}
                
                {/* <input type="text"     placeholder="username" onChange={e=>{setUsername(e.target.value)}} /> */}
                {/* <input type="password" placeholder="password" onChange={e=>{setPassword(e.target.value)}} /> */}

                <form className={classes.root} noValidate autoComplete="off">
                    <div style={{ display: 'flex',flexDirection:'column', height: '100%' }}>
                        <TextField  
                            required id="standard-required" 
                            label="Username" 
                            // defaultValue="Username" 
                            onChange={e=>{setUsername(e.target.value)}}
                        />

                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={e=>{setPassword(e.target.value)}}
                        />
                    </div>
                </form>

                <Button variant="contained" 
                        color="primary"
                        onClick={ async ()=>{
                            try {
                                const res = await fetch('http://localhost:1000/auth/login',{
                                    method:"POST",
                                    headers:{"content-type":"application/json"},
                                    body: JSON.stringify({username, password})
                                });
                                console.log(res.status);

                                const data = await res.json();
                                //console.log(data);

                                if(res.status===400){
                                    console.log(data.err)
                                    setErrorMsg(data.err)
                                }

                                if (data.token) {
                                    localStorage.token = data.token;
                                    history.push("/vacations_view")
                                }

                            } catch (error) {
                                console.log(error);
                            }
                        } }>
                    Login
                </Button>

                <p>Don't have an account yet? <Link to="/register">Register here</Link> </p>

            </div>
        </Container>
    )
}
