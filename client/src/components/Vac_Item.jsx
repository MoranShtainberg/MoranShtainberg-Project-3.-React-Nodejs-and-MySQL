import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardHeader from '@material-ui/core/CardHeader';

import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles({
    root: {
      maxWidth: 280,
    },
    media: {
      height: 110,
    },
  });

export default function Vac_Item({ single_vac, followHandler, del_vacation }) {
    const history = useHistory();    
    const userInfo = useSelector(state => state.userInfo)
    // console.log(userInfo);
    const dispatch = useDispatch();

    const d = (new Date(`${single_vac.from_date}`)).getDate()
    const m = (new Date(`${single_vac.from_date}`)).getMonth() + 1
    const y = (new Date(`${single_vac.from_date}`)).getFullYear()
    
    const td = (new Date(`${single_vac.to_date}`)).getDate()
    const tm = (new Date(`${single_vac.to_date}`)).getMonth() + 1
    const ty = (new Date(`${single_vac.to_date}`)).getFullYear()
    
    useEffect(() => {
       
    }, [])

    const classes = useStyles();

    return (
        
      <Card className={classes.root} elevation={4}>
         <CardHeader       
            title=    {single_vac.vac_destination}
            subheader={single_vac.vac_description}
          />

        <CardActionArea>
          <CardMedia
            className={classes.media}
            image=    {single_vac.vac_pic}
            title=    "Vacations app"
          />
          <CardContent>      
            <Typography variant="body3" color="textSecondary" component="p">
                Price: ${single_vac.price}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
                From date: {d}/{m}/{y}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
                To date: {td}/{tm}/{ty}
            </Typography>
          </CardContent>

        </CardActionArea>

        {/* e.target.checked, userInfo[0].user_id, single_vac.Vac_id */}
        {/* name="checkedH"  checked={single_vac.follow_flag} */}

        <CardActions>
            {userInfo[0].isAdmin === 0 && (
                <Button size="small" color="primary">
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}  checked={single_vac.follow_flag} onChange={(e) => followHandler(e.target.checked, single_vac.Vac_id) } />
                </Button>
            )}
            {userInfo[0].isAdmin === 1 && (
                <div>
                    <EditIcon   style={{ cursor: 'pointer' }} onClick={() => history.push(`/vacation_edit/${single_vac.Vac_id}`)} />
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => del_vacation(single_vac.Vac_id)} />
                </div>
            )}
        </CardActions>
      </Card>
    
    )
}
