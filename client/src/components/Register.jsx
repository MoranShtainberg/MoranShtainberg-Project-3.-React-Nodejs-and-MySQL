import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import LocalAirportIcon from '@material-ui/icons/LocalAirport';

import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));
//--------------------------------------------------------export---------------------------------
export default function Register( {history} ) {
    const classes = useStyles();
   
    const [username, setUsername]     = useState("")
    const [password, setPassword]     = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name]   = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    //-----------------------------------------------------return-----------------------------------
    return (
        <Container>
            <div>
                <h1>Register page</h1>
                <LocalAirportIcon style={{ fontSize: 50 }}/>
                {errorMsg && <h1>Err:{errorMsg}</h1>}

                {/* <input type="text"     placeholder="username"   onChange={ e=>{setUsername(e.target.value)} } />
                <input type="password" placeholder="password"   onChange={ e=>{setPassword(e.target.value)} } />
                <input type="text"     placeholder="First name" onChange={ e=>{setFirst_name(e.target.value)} } />
                <input type="text"     placeholder="Last name"  onChange={ e=>{setLast_name(e.target.value)} } /> */}

                <form className={classes.root} noValidate autoComplete="off">
                    <div style={{ display: 'flex',flexDirection:'column', height: '100%' }}>
                        <TextField  
                            required id="standard-required" 
                            label="Username"                          
                            onChange={e=>{setUsername(e.target.value)}}
                        />

                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={e=>{setPassword(e.target.value)}}
                        />

                        <TextField  
                            required id="standard-required" 
                            label="First name"                          
                            onChange={e=>{setFirst_name(e.target.value)}}
                        />

                        <TextField  
                            required id="standard-required" 
                            label="Last name"                          
                            onChange={e=>{setLast_name(e.target.value)}}
                        />

                    </div>
                </form>

                <Button variant="contained" 
                        color="primary"
                         onClick={ async ()=>{
                            try {
                                const res = await fetch('http://localhost:1000/auth/register',{
                                    method:"POST",
                                    headers:{"content-type":"application/json"},
                                    body: JSON.stringify({username, password, first_name, last_name})
                                })
                                console.log(res);

                                
                                if(res.status===201) {
                                    console.log(res.status)
                                    history.push("/login")
                                }
                                
                                const data = await res.json();
                                // console.log(data);
                                
                                if(res.status===400){
                                    console.log(data.err)
                                    setErrorMsg(data.err)
                                }
                                
                                // if (data.user_id) {
                                //     history.push("/login")
                                // }


                            } catch (error) {
                                console.log(error);
                            }
                        } } >
                    Register
                </Button>

                <p>Already have an account? <Link to="/login">Login</Link> </p>

            </div>
        </Container>
    )
}
