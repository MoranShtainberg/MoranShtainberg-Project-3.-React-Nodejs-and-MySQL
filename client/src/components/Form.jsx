import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import Nav from './Nav'
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, 
  DatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '75ch',
      },
    },
  }));

export default function Form() {
    const history = useHistory();
    const classes = useStyles();

    const [vac_destination, setVac_destination] = useState("")
    const [vac_description, setVac_description] = useState("")
    const [vac_pic, setVac_pic] = useState("")
    const [from_date, setFrom_date] = useState( new Date() )
    const [to_date, setTo_date] = useState( new Date() )
    const [price, setPrice] = useState(0)

    //vac_destination, vac_description, vac_pic, from_date, to_date, price

    const add_a_vacation = async (vac_destination, vac_description, vac_pic, from_date, to_date, price)=> {
        const res = await fetch(`http://localhost:1000/form`,{
            method:"POST",
            body: JSON.stringify({ vac_destination, vac_description, vac_pic, from_date, to_date, price }),
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.token
            }
        });
        history.push('/vacations_view')
    }
    //-----------------------------------------------------return----------------------
    return (
        <Container>
            <div>
                <Nav/>

                <h1>Hi admin, here you can add a new vacation</h1>

                <div className={classes.root} style={{ display: 'flex',flexDirection:'column', height: '100%' }} >
                    {/* <input type="text" placeholder="Vacation destination" variant="outlined" onChange={e=> setVac_destination(e.target.value)} /> */}
                    <TextField id="outlined-basic" label="Vacation destination" variant="outlined" onChange={e=> setVac_destination(e.target.value)}/>

                    {/* <input type="text" placeholder="Vacation description" onChange={e=> setVac_description(e.target.value)} /> */}
                    <TextField id="outlined-basic" label="Vacation description" variant="outlined" onChange={e=> setVac_description(e.target.value)}/>

                    {/* <input type="text" placeholder="Vacation picture URL" onChange={e=> setVac_pic(e.target.value)} /> */}
                    <TextField id="outlined-basic" label="Vacation picture URL" variant="outlined" onChange={e=> setVac_pic(e.target.value)}/>
                            
                    {/* <input type="number" placeholder="Price in USD"       onChange={e=> setPrice(e.target.valueAsNumber)} /> */}
                    <TextField id="outlined-basic" label="Price in USD" variant="outlined" onChange={e=> setPrice(e.target.value)} />

                    {/* <input type="date" onChange={e=> setFrom_date(e.target.valueAsDate)} /> */}
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker                         
                          // variant="inline"
                          format="dd/MM/yyyy"
                          // margin="normal"
                          // id="date-picker-inline"
                            label="From date"
                            value={from_date}
                            onChange={setFrom_date} 
                            animateYearScrolling
                      />

                      {/* <input type="date" onChange={e=> setTo_date(e.target.valueAsDate)} /> */}               
                      <DatePicker                         
                          // variant="inline"
                          format="dd/MM/yyyy"
                          // margin="normal"
                          // id="date-picker-inline"
                            label="To date"
                            value={to_date}
                            onChange={setTo_date} 
                            animateYearScrolling
                      />
                    </MuiPickersUtilsProvider>
                   

                </div>

                <Button variant="contained" 
                        color="primary" 
                        onClick={()=> add_a_vacation(vac_destination, vac_description, vac_pic, from_date, to_date, price)} 
                >Click to Add
                </Button>

            </div>
        </Container>
    )
}
