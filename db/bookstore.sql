DROP DATABASE IF EXISTS bookstore;
CREATE DATABASE bookstore;

USE bookstore;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS bookstore_admin;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS sale;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS translator;
DROP TABLE IF EXISTS make_sale;
DROP TABLE IF EXISTS manage_sale;
DROP TABLE IF EXISTS has_author;
DROP TABLE IF EXISTS has_translator;

-- tables

CREATE TABLE customer(
	user_id nvarchar(50) PRIMARY KEY,
    username nvarchar(30) UNIQUE NOT NULL,
    user_password nvarchar(50) NOT NULL,
    first_name nvarchar(100) NOT NULL,
    last_name nvarchar(100) NOT NULL,
    email nvarchar(50) UNIQUE NOT NULL,
    phone_number nvarchar(30) NOT NULL,
    address nvarchar(1000) NOT NULL
);

CREATE TABLE bookstore_admin(
	admin_id nvarchar(50) PRIMARY KEY,
    username nvarchar(30) UNIQUE NOT NULL,
    user_password nvarchar(50) NOT NULL,
	first_name nvarchar(100) NOT NULL,
    last_name nvarchar(100) NOT NULL,
    email nvarchar(50) UNIQUE NOT NULL
);

CREATE TABLE book(
	book_id nvarchar(50) PRIMARY KEY,
    book_name nvarchar(100) NOT NULL,
    book_type nvarchar(100) NOT NULL,
    book_price nvarchar(100) NOT NULL,
    book_desc nvarchar(10000)
);

CREATE TABLE sale(
	sale_id nvarchar(50) PRIMARY KEY,
    sale_type nvarchar(50) NOT NULL,
    sale_amount nvarchar(100) NOT NULL,
    delivery_date date NOT NULL,
    delivery_time_from time NOT NULL,
    delivery_time_to time NOT NULL
);

CREATE TABLE author(
	author_id nvarchar(50) PRIMARY KEY,
	first_name nvarchar(100) NOT NULL,
    last_name nvarchar(100) NOT NULL,
    nationality nvarchar(100)
);

CREATE TABLE translator(
	translator_id nvarchar(50) PRIMARY KEY,
	first_name nvarchar(100) NOT NULL,
    last_name nvarchar(100) NOT NULL,
    nationality nvarchar(100)
);

CREATE TABLE make_sale(
	book_id nvarchar(50),
    user_id nvarchar(50),
    sale_id nvarchar(50),
	FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (user_id) REFERENCES customer(user_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE manage_sale(
	admin_id nvarchar(50),
	book_id nvarchar(50),
    user_id nvarchar(50),
    sale_id nvarchar(50),
	FOREIGN KEY (admin_id) REFERENCES bookstore_admin(admin_id),
	FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (user_id) REFERENCES customer(user_id),
    FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
);

CREATE TABLE has_author(
	book_id nvarchar(50),
    author_id nvarchar(50),
	FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id)
);

CREATE TABLE has_translator(
	book_id nvarchar(50),
    translator_id nvarchar(50),
	FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (translator_id) REFERENCES translator(translator_id)
);

-- assigning temporary data

INSERT INTO customer VALUES(
 'sdsdjbb312b1vggcf' , 'johnd11' , '1234567' , 'John' , 'Doe' , 
 'johndoe@hotmail.com' , '3214556575' , 'CL,21th'
);

INSERT INTO bookstore_admin VALUES(
  'dfdsfdsfdsfdf' , 'admin' , 'admin1234' , 'Anne' , 'Smith' , 'bstoreadmin@hotmail.com'
);

INSERT INTO book VALUES(
  '124545546' , 'Gone with the wind' , 'classic' , '23$' , 'famous classic novel'
);

INSERT INTO sale VALUES(
  '12asasa' , 'online' , '123$' , '2021-01-21' , '13:00:00' , '16:00:00'
);

INSERT INTO author VALUES(
  '12324234' , 'Bob' , 'Stall' , 'American'
);

INSERT INTO translator VALUES(
  '1245454' , 'Jaque' , 'Mondes' , 'French'
);

INSERT INTO make_sale VALUES(
  '124545546' , 'sdsdjbb312b1vggcf' , '12asasa'
);

INSERT INTO manage_sale VALUES(
  'dfdsfdsfdsfdf' , '124545546' , 'sdsdjbb312b1vggcf' , '12asasa'   
);

INSERT INTO has_author VALUES(
   '124545546' , '12324234'
);

INSERT INTO has_translator VALUES(
   '124545546' ,  '1245454'
);

-- functionalities

-- recent purchases
SELECT book_name, book_price
FROM make_sale AS m
JOIN book AS b
ON b.book_id = m.book_id;

-- getting the list of all books
SELECT book_name, book_price
FROM book;

-- getting the list of books based on book type
SELECT book_name, book_price
FROM book
WHERE book_type = 'classic';

SELECT book_name, book_price
FROM book
WHERE book_type = 'romance';

SELECT book_name, book_price
FROM book
WHERE book_type = 'horror';

SELECT book_name, book_price
FROM book
WHERE book_type = 'fantasy';

SELECT book_name, book_price
FROM book
WHERE book_type = 'crime';

SELECT book_name, book_price
FROM book
WHERE book_type = 'fiction';

SELECT book_name, book_price
FROM book
WHERE book_type = 'children';

-- searching a book name
SELECT book_name, book_price
FROM book
WHERE book_name = 'Gone with the wind';

-- getting a certain book's info
SELECT *
FROM book AS b
JOIN has_author AS h
ON b.book_id = h.book_id
JOIN author AS a
ON h.author_id = a.author_id
WHERE book_name = 'Gone with the wind';

-- getting author's info
SELECT * 
FROM author
WHERE first_name = 'Bob' AND last_name = 'Stall';

-- getting translator's info


-- getting the list of an author's books
SELECT book_name, book_type
FROM book AS b
JOIN has_author AS h
ON h.book_id = b.book_id 
WHERE author_id = '12324234';

-- getting the list of a translator's works

-- profile info
SELECT *
FROM customer
WHERE user_id = 'sdsdjbb312b1vggcf';

-- admin info
SELECT *
FROM bookstore_admin
WHERE admin_id = 'dfdsfdsfdsfdf';

-- all purchases of customers (admin)
SELECT b.book_name , c.first_name , c.last_name , s.sale_amount
FROM make_sale AS m
JOIN book AS b
ON m.book_id = b.book_id 
JOIN customer AS c
ON m.user_id = c.user_id
JOIN sale AS s
ON m.sale_id = s.sale_id; 

-- all purchases of customer
SELECT b.book_name , s.sale_amount
FROM make_sale AS m
JOIN book AS b
ON m.book_id = b.book_id 
JOIN customer AS c
ON m.user_id = c.user_id
JOIN sale AS s
ON m.sale_id = s.sale_id
WHERE c.user_id = 'sdsdjbb312b1vggcf';