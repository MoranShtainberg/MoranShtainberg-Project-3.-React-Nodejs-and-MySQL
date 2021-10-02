import React from 'react'
import { useHistory } from 'react-router';
import { useDispatch ,useSelector  } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react';
import jwt from "jsonwebtoken";
import Button from '@material-ui/core/Button';


//----------------------------------------------------expost detault
export default function Nav() {
    const history = useHistory();
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();

    //----------------------------------------------useEffect
    useEffect(() => {
      //-------------Dispatch
        dispatch({
            type: "USER_INFO",
            first_name: jwt.decode(localStorage.token).first_name,
            isAdmin: jwt.decode(localStorage.token).isAdmin,
            expirty: jwt.decode(localStorage.token).exp,
            user_id: jwt.decode(localStorage.token).user_id,
        })
    }, [])
    
    //------------------------------------------return
    return (
        <div className="nav_main_div">
            {userInfo[0] && userInfo[0].isAdmin ? (
                <div>
                    <NavLink to="/vacations_view" activeClassName="selected" className="navlink_style">Vacations</NavLink>
                    <NavLink to="/form"           activeClassName="selected" className="navlink_style">Add a vacations</NavLink>
                    <NavLink to="/reports"        activeClassName="selected" className="navlink_style">reports</NavLink>
                </div>
            ) : null}

            {userInfo[0] ?  (<span className="nav_span">Hello {userInfo[0].first_name}</span>) : null}

            <Button variant="contained" 
                    
                    onClick={ ()=>{ localStorage.removeItem("token")
                                    history.push('/login')
                                } } 
            >Logout</Button>
        </div>
    )
}
