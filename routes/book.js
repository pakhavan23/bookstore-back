const express = require('express');
const db = require('./../db');

const router = express.Router();

router.get('/all',(req,res,next)=>{                                                                      //list of all books
    const sql = 'SELECT book_name, book_price FROM book';
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/classic',(req,res,next)=>{                                                                   //getting the list of books based on their type
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'classic'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/romance',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'romance'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/horror',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'horror'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/fantasy',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'fantasy'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/crime',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'crime'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/fiction',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'fiction'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/children',(req,res,next)=>{
    const sql = "SELECT book_name, book_price FROM book WHERE book_type = 'children'";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/recent',(req,res,next)=>{                                                                             //User's recent purchases
    const sql = "SELECT book_name, book_price FROM make_sale AS m JOIN book AS b ON b.book_id = m.book_id";
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/books/:bookName' , (req,res,next) => {                                                                //Search based on name
    const {bookName} = req.params 
    const sql = `SELECT book_name, book_price FROM book WHERE book_name = '${bookName}'`;
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            books:result
        })
    })
})

router.get('/books/:bookName/info' , (req,res,next) => {                                                           //getting the book's info
    const {bookName} = req.params ;
    const sql = `SELECT *
    FROM book AS b
    JOIN has_author AS h
    ON b.book_id = h.book_id
    JOIN author AS a
    ON h.author_id = a.author_id
    WHERE book_name = '${bookName}'`;
    const query = db.query(sql,async(err,result)=>{
        if(err){
            console.error(err);
        }
        return res.status(200).json({
            status:'success',
            book:result
        })
    })
})

router.post('/author' , (req,res,next) => {                                                                          //getting an author's info
    const {firstName , lastName } = req.body;
    const sql = `SELECT * FROM author WHERE first_name = '${firstName}' AND last_name = '${lastName}'`;
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

router.post('/author/books' , (req,res,next) => {                                                                     //getting an author's books
    const {firstName , lastName } = req.body;
    const sql = `SELECT b.book_name, b.book_price
    FROM book AS b
    JOIN has_author AS h
    ON h.book_id = b.book_id 
    JOIN author AS a
    ON h.author_id = a.author_id
    WHERE a.first_name = '${firstName}' and a.last_name = '${lastName}'`;
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