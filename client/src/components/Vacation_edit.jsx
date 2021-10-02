import React, { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core'
import Nav from './Nav'

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

export default function Vacation_edit() {
    const classes = useStyles();

    const history = useHistory()
    // console.log(history.location.pathname)
    const path = history.location.pathname
    // console.log(path.split("/")[2])
    const vacIdFromPath = path.split("/")[2]
    // console.log(vacIdFromPath)
 
    const [vac_destination, setVac_destination] = useState("")
    const [vac_description, setVac_description] = useState("")
    const [vac_pic, setVac_pic] = useState("")
    const [from_date, setFrom_date] = useState(0)
    const [to_date, setTo_date] = useState(0)
    const [price, setPrice] = useState(0)

    //------------------------------------------useEffect--------------------------------
    useEffect(() => {

        if (!localStorage.token) {
            history.push('/login')
        }

        const fetchVacToEditDetailes = async ()=>{
            try {
                const res = await fetch('http://localhost:1000/vacation_edit/'+vacIdFromPath,{
                    method:"GET",
                    headers:{
                        "authorization": localStorage.token
                    }
                })

                const data = await res.json();
                // console.log(data)
                // console.log(data[0].vac_description)

                setVac_destination(data[0].vac_destination)
                setVac_description(data[0].vac_description)
                setVac_pic(data[0].vac_pic)
                setFrom_date(data[0].from_date)
                setTo_date(data[0].to_date)
                setPrice(data[0].price)

            } catch (error) {
                console.log(error);
            }
        }

        fetchVacToEditDetailes();
    }, [])

    //        vac_destination, vac_description, vac_pic, from_date, to_date, price
    //Vac_id, vac_destination, vac_description, vac_pic, from_date, to_date, price

    const edit_a_vacation = async (Vac_id, vac_destination, vac_description, vac_pic, from_date, to_date, price)=>{
        try {
            await fetch(`http://localhost:1000/vacation_edit`,{
                method:"PUT",
                body: JSON.stringify({ Vac_id, vac_destination, vac_description, vac_pic, from_date, to_date, price }),
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.token
                }
            })

            history.push('/vacations_view')
            
        } catch (error) {
            console.log(error);
        }
    }
    //-------------------------------------------return------------------------------------
    return (
        
        <Container>
            <Nav/>

            <h1>Hi admin, here, you can edit existing vacation details</h1>          

            <div className={classes.root} style={{ display: 'flex',flexDirection:'column', height: '100%' }}>
                {/* <input type="text" placeholder="Vacation destination" value={vac_destination} onChange={e=> setVac_destination(e.target.value)}/> */}
                <TextField id="outlined-basic" label="Vacation destination" value={vac_destination} onChange={e=> setVac_destination(e.target.value)}/>

                {/* <input type="text" placeholder="Vacation description" value={vac_description} onChange={e=> setVac_description(e.target.value)}/> */}
                <TextField id="outlined-basic" label="Vacation description" value={vac_description} onChange={e=> setVac_description(e.target.value)}/>

                {/* <input type="text" placeholder="picture URL"          value={vac_pic}   onChange={e=> setVac_pic(e.target.value)}/> */}
                <TextField id="outlined-basic" label="Vacation picture URL" value={vac_pic} onChange={e=> setVac_pic(e.target.value)}/>

                {/* <input type="number" name="price" placeholder="price in USD" value={price}    onChange={e=> setPrice(e.target.valueAsNumber)}/> */}
                <TextField id="outlined-basic" label="Price in USD" value={price} onChange={e=> setPrice(e.target.value)} />

                {/* <input type="date" name="from_date"                   value={from_date}       onChange={e=> setFrom_date(e.target.value)}/>                           */}

                {/* <input type="date" name="to_date"                     value={to_date}         onChange={e=> setTo_date(e.target.value)}/> */}

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
                        onClick={()=> edit_a_vacation(vacIdFromPath,vac_destination, vac_description, vac_pic, from_date, to_date, price)}>
                    Submit
                </Button>
        </Container>
    )
}
