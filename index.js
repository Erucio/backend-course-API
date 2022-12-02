const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser')
const logger = require('./middleware/logger');
const cors = require('cors');
const exphbs = require('express-handlebars');
const products = require('./data/Products')

const app = express();



// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json())//Hassekod
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// routes / Router *Hassekod
const productTags = require('./routes/productTags')
app.use('/api/products', productTags);



const router = require('./Routes/products')

app.use('/api/products', router);


// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Product Creator',
    products
})); 

// Set static folder "Hello World" Ligger den över homepage så syns denna 
app.use(express.static(path.join(__dirname, 'public')));

// products API Routes
app.use('/api/products', require('./routes/products'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));