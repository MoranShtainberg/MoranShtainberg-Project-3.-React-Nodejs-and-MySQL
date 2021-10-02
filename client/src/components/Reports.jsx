import React, { useState } from 'react'
import { useEffect } from 'react'
import Nav from './Nav'
import { Bar } from 'react-chartjs-2'
import { Container } from '@material-ui/core'


export default function Reports() {

    const [followArr, setFollowArr] = useState([])
    
    let destinationData = []
    let followersData = []

    for (let index = 0; index < followArr.length; index++) {

        let tempDestination = followArr[index].vac_destination
        destinationData.push(tempDestination) 
        
        let tempFollow = followArr[index].followers
        followersData.push(tempFollow)
    }
    //console.log(destinationData)
    // console.log(followersData)
    //-----------------------------------------------useEffect-----
    useEffect(() => {
        const fetchFollowArr = async () => {
            try {
                const res = await fetch('http://localhost:1000/reports', {
                    method: "GET",
                    headers: {
                        "authorization": localStorage.token
                    }
                });

                const data = await res.json();
                console.log(data);               

                setFollowArr(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchFollowArr()     
    }, [])
    //--------------------------------------------return-----------------------
    return (
        <Container>
            <div>
                <Nav/>

                <h1>Followers Reports</h1>

                <div style={{"position": "relative", "height":"40vh", "width":"80vw"}}>
                    <Bar 
                        data={{
                            labels: destinationData,
                            datasets: [
                                {
                                    label:'# of Followers',
                                    data: followersData,
                                    backgroundColor: 'blue'
                                }
                            ]
                        }}                
                        options={{ 
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                    {                                
                                        ticks:{
                                            beginAtZero: true
                                        }
                                    }
                                ]
                            }
                        }}               
                    />           
                </div>          
            
            </div>
        </Container>
    )
}
