const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const products = require('../data/Products')




// Gets All Products
router.get('/', (req, res) => res.json(products)); 

// // Get Product req.product.tag= sök via tag som söks
// router.get('/:tag', (req, res) => {
//     const found = products.some(product => product.tag === (req.params.tag));
    
//     if(found) {
//         res.json(products.filter(product => product.tag === (req.params.tag)));
//     } 
//     else {
//         res.status(400).json({ msg: `No product with the tag of ${req.params.tag}`})
//     }
// });

// Get Single Product req.product.articleNumber= productID som söks
router.get('/:articleNumber', (req, res) => {
    const found = products.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
    if(found) {
        res.json(products.filter(product => product.articleNumber === parseInt(req.params.articleNumber)));
    } 
    else {
        res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
    }
});


// Create Product
router.post('/', (req, res) => {

    const newProduct = {
        articleNumber: (products[products.length -1])?.articleNumber > 0 ? (products[products.length -1])?.articleNumber +1 : 1,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        imageName: req.body.imageName
    }

    if(!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description || !newProduct.rating ){
        return res.status(400).json({ msg: 'Please fill in all fields'});
    }


    products.push(newProduct);
    res.redirect('/');
});

// Update Product
router.put('/:articleNumber', (req, res) => {
    const found = products.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
    if(found) {
        const updProduct = req.body;
        products.forEach(product => {
            if(product.articleNumber === parseInt(req.params.articleNumber)) {
                product.name = updProduct.name ? updProduct.name : product.name;
                product.description = updProduct.description ? updProduct.description : product.description;
                product.category = updProduct.category ? updProduct.category : product.category;
                product.price = updProduct.price ? updProduct.price : product.price;
                product.rating = updProduct.rating ? updProduct.rating : product.rating;

                res.json({msg: 'Product updated', product });
            }
        });
    } 
    else {
        res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
    }
});

// delete Product
router.delete('/:articleNumber', (req, res) => {
    const found = products.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
    if(found) {
        res.json({ msg: 'product deleted', products: products.filter(product => product.articleNumber !== parseInt(req.params.articleNumber))});
    } 
    else {
        res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
    }
});


module.exports = router;