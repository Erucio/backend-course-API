require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser')
const cors = require('cors');
const exphbs = require('express-handlebars');
const initMongoDB = require ('./mongoDB')
const productData = require ('./data/productData')

const app = express();




// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json())//Hassekod
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


// // routes / Router *Hassekod
// const productTags = require('./routes/productTags')
// app.use('/api/products', productTags);





// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Product Creator',
    productData
})); 

// Set static folder *Sätter statisk CSS på Homepage Route
app.use(express.static(path.join(__dirname, 'public')));

// products API Routes
app.use('/api/products', require('./routes/products'));
const PORT = process.env.PORT || 5000;

// initialize
initMongoDB()
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));