const router = require('express').Router();
const { myQuery } = require("../db");
const { adminsOnly } = require('../middleware/verify_user')
// -- GET / POST / DELETE / PUT


//-------------------------------------------------GET-------------------------------------
router.get("/",adminsOnly , async (req, res) => {
    try {
      // query 1
        const followed_vacations = await myQuery("select COUNT(br_user_id) AS followers, vac_destination FROM bridge INNER JOIN vacations ON Vac_id = br_Vac_id GROUP BY br_Vac_id HAVING count(br_user_id)");
        console.log(followed_vacations);       

        res.send(followed_vacations);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = router;