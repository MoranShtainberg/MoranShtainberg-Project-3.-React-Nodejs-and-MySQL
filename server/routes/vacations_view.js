const router = require('express').Router();
const { myQuery } = require("../db");
const { usersOnly, adminsOnly } = require('../middleware/verify_user')


//state
// let user_id = 2
// -- GET / POST / DELETE / PUT

//-------------------------------------------------GET-------------------------------------
router.get("/", usersOnly, async (req, res) => {
    try {
      // query 1
        const vacations = await myQuery(`SELECT * FROM vacations LEFT JOIN bridge ON vacations.Vac_id = bridge.br_Vac_id AND bridge.br_user_id = ${req.user.user_id}`);
        // console.log(vacations);

        const new_vac_arr =  vacations.map( (item) => ({
          Vac_id:          item.Vac_id,
          vac_destination: item.vac_destination,
          vac_description: item.vac_description,
          vac_pic:         item.vac_pic,
          from_date:       item.from_date.toISOString().substring(0,10),
          to_date:         item.to_date.toISOString().substring(0,10),
          price:           item.price,
          vac_followers:   item.vac_followers,
          bridge_id:       item.bridge_id,
          br_user_id:      item.br_user_id,
          br_Vac_id:       item.br_Vac_id,
          follow_flag:     item.br_user_id == req.user.user_id ? true : false

        })).sort((v1, v2) => {
          if (v1.follow_flag && !v2.follow_flag) {
            return -1;
          }

          if (!v1.follow_flag && v2.follow_flag) {
            return 1;
          }

          const v1Date = new Date(v1.from_date).getTime();
          const v2Date = new Date(v2.from_date).getTime();

          return v1Date < v2Date ? -1 : 1;
        });
        console.log(new_vac_arr);

      res.send(new_vac_arr);
    } catch (err) {
      res.status(500).send(err);
    }
});

//------------------------------------------------POST: add follow / remove follow by user-------
router.post("/", usersOnly, async (req, res) => {
  try {
    // const { user_id, Vac_id  } = req.body;
    const { followSwitch, Vac_id } = req.body;
    
    if (followSwitch == true) {
      await myQuery(`INSERT INTO bridge ( br_user_id,br_Vac_id ) VALUES (${req.user.user_id}, ${Vac_id})`);
      res.status(201).send();      
    }

    if (followSwitch == false) {
      const vacIdToDeleteFromBridge = await myQuery(`SELECT bridge_id FROM bridge WHERE br_user_id=${req.user.user_id} AND br_Vac_id=${Vac_id}`)

       console.log(vacIdToDeleteFromBridge[0].bridge_id)

      await myQuery(`DELETE FROM bridge WHERE bridge_id=${vacIdToDeleteFromBridge[0].bridge_id}`)
      res.status(201).send()
    }

  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

//------------------------------------------------DELETE vacation by admin---------------------

router.delete("/",adminsOnly,async (req, res)=>{
   
  try {
    const { Vac_id } = req.body;

    await myQuery(`DELETE FROM bridge WHERE br_Vac_id = ${Vac_id}`);

    await myQuery(`DELETE FROM vacations WHERE Vac_id = ${Vac_id}`);

    res.status(200).send();

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }  

})
//------------------------------------------------PUT/UPDATE vacation by admin-----------------
// router.put("/",async (req, res)=>{
   
//   try {
//     const { Vac_id, vac_destination, vac_description, vac_pic, from_date, to_date, price } = req.body;

//     await myQuery(`UPDATE vacations SET vac_destination='${vac_destination}',vac_description='${vac_description}', vac_pic='${vac_pic}',from_date='${from_date}',to_date='${to_date}',price='${price}' WHERE Vac_id = ${Vac_id}`);
//     res.send();

//   } catch (err) {
//     res.status(500).send(err);
//   }  

// })

//------------------------------------------------exports--------------------
module.exports = router;