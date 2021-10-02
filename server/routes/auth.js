const router = require('express').Router();
const { myQuery } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// -- GET / POST / DELETE / PUT


//----------------------------------------------------register---------------
router.post("/register", async (req, res)=>{
    
    try {
        const usersTempArr = await myQuery('SELECT * FROM users')
        console.log(usersTempArr);
        
        const { username, password, first_name, last_name } = req.body;
    
        //check missing info
        if (!username || !password || !first_name || !last_name ) {
            return res.status(400).send({err:"Missing some info"})
        }
    
        //check if the username is already taken
        if (usersTempArr.some((user)=> user.username === username)) {
            return res.status(400).send({err:"Username is already taken"})
        }
    
        //Encrypt the password
        const hashedPass = await bcrypt.hash(password,10);
                
        await myQuery(`INSERT INTO users(first_name, last_name, username, password, isAdmin ) VALUES ("${first_name}", "${last_name}", "${username}", "${hashedPass}", false)`);
        res.status(201).send();
        
    } catch (error) {
        res.status(500).send(error);
    }
})
//----------------------------------------------------login---------------

router.post("/login", async (req, res)=>{
    try {
        const usersTempArr = await myQuery('SELECT * FROM users')
        console.log(usersTempArr);
        
        const { username, password } = req.body;
    
        //check missing info
        if (!username || !password ) {
            return res.status(400).send({err:"Missing some info"});
        }
        
        const user = usersTempArr.find((user)=>user.username === username);
    
        //user does not exist
        if (!user) {
            return res.status(400).send({err:"User not found"});
        }
    
        // password compare
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({err:"Wrong password"});
        }
    
        //create a token
        const token = jwt.sign(
            {
                user_id:    user.user_id,
                username:   user.usernamem,
                first_name: user.first_name,
                isAdmin:    user.isAdmin,
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "40m"
            }
        );
    
        res.send({token});
        
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;