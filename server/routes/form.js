const router = require('express').Router();
const { myQuery } = require("../db");
const { adminsOnly } = require('../middleware/verify_user')
// -- GET / POST / DELETE / PUT

//------------------------------------------------POST-----------------------
router.post("/",adminsOnly , async (req, res) => {
    try {
      const { vac_destination, vac_description, vac_pic, from_date, to_date, price  } = req.body;
  
      await myQuery(`INSERT INTO vacations (vac_destination, vac_description, vac_pic, from_date, to_date, price) VALUES ("${vac_destination}","${vac_description}","${vac_pic}","${from_date}","${to_date}","${price}")`);
      res.status(201).send();
  
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;