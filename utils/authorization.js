const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const db = require('./../db');

exports.protect = async (req, res, next) => {
    let token
    // 1) Getting token and check if it's there
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({ status: 'failed' , message: 'You are not logged in! Please log in to get access.'})
    }
    // 2) Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // 3) Check if user still exists
    let freshUser;
    let sql = `SELECT * FROM customer WHERE user_id = '${decoded.id}'`;
    const query = db.query(sql,(err,result) => {
        if(err){
            console.error(err)
        }
        if(result.length === 1){
            freshUser = result[0]
        }
    })
    if (!freshUser) {
        return res.status(401).json({status: 'failed' , message: 'The user belonging to this Token does not exists'})
    }
    // 4) Check if user changed password after the token was issued
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({status: 'failed' , message: 'User recently changed password! please log in again.'})
    }
    req.user = freshUser;
    next();
}