const express = require('express');
const db = require('./../db');

const router = express.Router();

router.post('/profile' , (req,res,next) => {                                                                //Search based on name
    const {username} = req.body
    const sql = `SELECT * FROM customer WHERE username = '${username}'`;
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

module.exports = router;