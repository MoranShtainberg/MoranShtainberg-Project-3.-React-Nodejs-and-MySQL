const router = require('express').Router();
const { myQuery } = require("../db");
const { usersOnly, adminsOnly } = require('../middleware/verify_user')

// -- GET / POST / DELETE / PUT

//-------------------------------------------GET-------------------------------------------
router.get('/:Vac_id',usersOnly ,async(req,res)=>{
    
    try {
        const vacToEdit_raw = await myQuery(`SELECT * FROM vacations WHERE Vac_id=${req.params.Vac_id}`)
        
        const vacToEdit =  vacToEdit_raw.map( (item) => ({
            Vac_id:          item.Vac_id,
            vac_destination: item.vac_destination,
            vac_description: item.vac_description,
            vac_pic:         item.vac_pic,
            from_date:       item.from_date.toISOString().substring(0,10),
            to_date:         item.to_date.toISOString().substring(0,10),
            price:           item.price        
         
  
          })); 

        res.send(vacToEdit)
        
    } catch (error) {
        res.status(500).send(error)
    }

})
//------------------------------------------------PUT/UPDATE vacation by admin----
router.put("/",adminsOnly ,async (req, res)=>{
   
    try {
      const { Vac_id, vac_destination, vac_description, vac_pic, from_date, to_date, price } = req.body;
  
      await myQuery(`UPDATE vacations SET vac_destination='${vac_destination}',vac_description='${vac_description}', vac_pic='${vac_pic}',from_date='${from_date}',to_date='${to_date}',price='${price}' WHERE Vac_id = ${Vac_id}`);
      res.send();
  
    } catch (err) {
      res.status(500).send(err);
    }  
  
  })

module.exports = router;