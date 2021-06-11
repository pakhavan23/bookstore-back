const express = require('express');
const db = require('./../db');

const router = express.Router();

app.get('/books',(req,res,next)=>{                                                                      //list of all books
    const sql = 'SELECT book_name, book_price FROM book';
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/classic',(req,res,next)=>{                                                                   //getting the list of books based on their type
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'classic'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/romance',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'romance'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/horror',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'horror'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/fantasy',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'fantaasy'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/crime',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'crime'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/fiction',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'fiction'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/children',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'children'";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

app.get('/recent',(req,res,next)=>{                                                                             //User's recent purchases
    const sql = "SELECT book_name, book_price FROM make_sale AS m JOIN book AS b ON b.book_id = m.book_id";
    const query = connection.query(sql,async(err,result)=>{
        if(err) console.error(err)
        return res.status(200).json({
            status:'success',
            users:result
        })
    })
})

module.exports = router;