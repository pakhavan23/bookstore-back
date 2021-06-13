const express = require('express');
const db = require('./../db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.user_id)



    // Remove the password from respond
    user.user_password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

router.post('/signup',async(req,res,next)=>{
    let sql = `SELECT * FROM customer WHERE username = '${req.body.username}'`;
    const query1 = db.query(sql , async(err, result) => {
        if(err){
            console.error(err);
        }
        if(result.length === 0){
            const { username , user_password , first_name , last_name , email , phone_number , address} = req.body

            // Hash the password with cost 12 
            const hashedPass = await bcrypt.hash(user_password, 12)
        
            const user = {user_id: uuidv4(), user_password:hashedPass, username , first_name , last_name , email , phone_number , address}
            sql = 'INSERT INTO customer SET ?'
            const query = db.query(sql, user, (err,result) => {
                if(err) console.error(err)
                console.log(result)
            })
        
            createSendToken(user, 200, res);
        }
        else{
            res.status(400).json({status: 'failed', message: 'User has already registered'})
        }
    })
})

router.post('/login',(req, res, next)=>{
    const { user_password , username} = req.body

    const sql = `SELECT * FROM customer WHERE username = '${username}'`
    const query = db.query(sql,async(err,result)=>{
        if(err) console.error(err)
        if(result.length !== 0){
            console.log(result[0].user_password)
            const checkUserPass = await bcrypt.compare(user_password,result[0].user_password)
            if(checkUserPass){
                result[0].user_password = undefined
                req.user = result[0]
                return createSendToken(result[0], 200, res);
            }
        }

        return res.status(401).json({status:"fail",message:"invalid login credential"})
    })
})

module.exports = router;