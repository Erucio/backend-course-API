const express = require('express');
const { db } = require('../schemas/productSchema');
const router = express.Router();
const productSchema = require('../schemas/productSchema')


router.route('/').get(async (req, res) => {
    const products = []
    const list = await productSchema.find()
    if(list) {
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

router.route('/:tag').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag })
    if(list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

router.route('/:tag/:take').get(async (req, res) => {
    const products = []
    const list = await productSchema.find({ tag: req.params.tag }).limit(req.params.take)
    if(list){
        for(let product of list) {
            products.push({
                articleNumber: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tag: product.tag,
                imageName: product.imageName,
                rating: product.rating
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

router.route('/product/details/:articleNumber').get(async (req, res) => {
    const product = await productSchema.findById(req.params.articleNumber)
    if(product) {
        res.status(200).json({
            articleNumber: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            tag: product.tag,
            imageName: product.imageName,
            rating: product.rating,
        }) 
    } else
        res.status(400).json()
})

// CRUD routes
router.route('/').post(async (req, res) =>{
    const {name, description, price, category, tag, imageName, rating} = req.body

    if(!name || !price)
        res.status(400).json({msg: 'name and price is required'})
    const item_exists = await productSchema.findOne({name})
    if (item_exists)
        res.status(400).json({msg: `a product with that name already exists.`})
    else {
        const product = await productSchema.create({
            name,
            description,
            price,
            category,
            tag,
            imageName,
            rating
        })
        if (product)
            res.status(201).json({msg: `product with id ${product._id} created succesfully.`})
        else
            res.status(400).json({msg: `something went wrong when creating the product.`})
    }
})

// Delete Product
router.route('/:articleNumber').delete(async (req, res) =>{
    if(!req.params.articleNumber)
        res.status(400).json({msg: `no article number was specified`})
    else {
        const product = await productSchema.findById(req.params.articleNumber)
        if (product) {
         await productSchema.remove(product)
         res.status(200).json({msg: `product with article number ${req.params.articleNumber} has been deleted`})
        } else {
         res.status(404).json({msg: `product with article number ${req.params.articleNumber} was not found`})
        }
    }
})

// Update Product V.1.0 *Fungerar ej
// router.route('/:articleNumber').put(async (req, res) =>{
//     if (!req.params.articleNumber)
//         res.status(400).json({msg: `no article number was specified`})
//     else {
//         const found = productSchema.findByIdAndUpdate(req.params.articleNumber)
//         if(found) {
//             let updProduct = {
//                 name: req.body.name,
//                 description: req.body.description,
//                 category: req.body.category,
//                 price: req.body.price,
//                 rating: req.body.rating,
//                 imageName: req.body.imageName
//             }
//             productSchema.updateOne(product => {   
//                         product.name = updProduct.name ? updProduct.name : product.name
//                         product.description = updProduct.description ? updProduct.description : product.description
//                         product.category = updProduct.category ? updProduct.category : product.category
//                         product.price = updProduct.price ? updProduct.price : product.price
//                         product.rating = updProduct.rating ? updProduct.rating : product.rating
//                         product.imageName = updProduct.imageName ? updProduct.imageName : product.imageName             
//                 })
//                 res.json({msg: 'Product updated' })    
//         }   else {
//                 res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
// }}})


// Update Product V.2.0 *Fungerar ej
// const update = (req, res, next) => {
//     let articleNumber = req.body.articleNumber
//     let updateProduct = {
//         name: req.body.name,
//         description: req.body.description,
//         category: req.body.category,
//         price: req.body.price,
//         rating: req.body.rating,
//         imageName: req.body.imageName
//     }
//     productSchema.findByIdAndUpdate(articleNumber, {$set: updateProduct})
//     .then(() => {
//         res.json({msg: `product with id ${req.params.articleNumber} has been updated`})})
//     db.on('error', (err) =>{
//         console.log(err)})
//     .catch(error => { 
//         res.status(404).json({msg: `an error has occured`})
//     })}
// router.put('/:articleNumber', update)


// Update Product V.3.0
router.route('/:articleNumber').put(async (req, res) =>{
    const { name, description, price, category, tag, imageName, rating} = req.body

    const item_exists = await productSchema.findOne({name})
    if (item_exists)
        res.status(400).json({msg: `a product with that name already exists.`})
    else {
        const found = await productSchema.findById(req.params.articleNumber)
        if (found) {
            await productSchema.findByIdAndUpdate(found, {$set: found, name, description, category, tag, imageName, price, rating})
            res.status(201).json({msg: `product with id ${req.params.articleNumber} has been updated.`})
        } else {
            res.status(400).json({msg: `something went wrong when updating the product.`})
        }
    }
})


// CRUD innan MONGODB
// -----------------------------------------------------------------------------------------------------------------------------------

// Gets All Products
// router.get('/', (req, res) => res.json(productSchema)); 

// // Get Product req.product.tag= sök via tag som söks
// router.get('/:tag', (req, res) => {
//     const found = productSchema.some(product => product.tag === (req.params.tag));
    
//     if(found) {
//         res.json(productSchema.filter(product => product.tag === (req.params.tag)));
//     } 
//     else {
//         res.status(400).json({ msg: `No product with the tag of ${req.params.tag}`})
//     }
// });

// // Get Single Product req.product.articleNumber= productID som söks
// router.get('/:articleNumber', (req, res) => {
//     const found = productSchema.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
//     if(found) {
//         res.json(productSchema.filter(product => product.articleNumber === parseInt(req.params.articleNumber)));
//     } 
//     else {
//         res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
//     }
// });


// // Create Product
// router.post('/', (req, res) => {

//     const newProduct = {
//         articleNumber: (productSchema[productSchema.length -1])?.articleNumber > 0 ? (productSchema[productSchema.length -1])?.articleNumber +1 : 1,
//         name: req.body.name,
//         description: req.body.description,
//         category: req.body.category,
//         price: req.body.price,
//         rating: req.body.rating,
//         imageName: req.body.imageName
//     }

//     if(!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description || !newProduct.rating ){
//         return res.status(400).json({ msg: 'Please fill in all fields'});
//     }


//     productSchema.push(newProduct);
//     res.redirect('/');
// });

// // Update Product
// router.put('/:articleNumber', (req, res) => {
//     const found = productSchema.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
//     if(found) {
//         const updProduct = req.body;
//         productSchema.forEach(product => {
//             if(product.articleNumber === parseInt(req.params.articleNumber)) {
//                 product.name = updProduct.name ? updProduct.name : product.name;
//                 product.description = updProduct.description ? updProduct.description : product.description;
//                 product.category = updProduct.category ? updProduct.category : product.category;
//                 product.price = updProduct.price ? updProduct.price : product.price;
//                 product.rating = updProduct.rating ? updProduct.rating : product.rating;

//                 res.json({msg: 'Product updated', product });
//             }
//         });
//     } 
//     else {
//         res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
//     }
// });

// // delete Product
// router.delete('/:articleNumber', (req, res) => {
//     const found = productSchema.some(product => product.articleNumber === parseInt(req.params.articleNumber));
    
//     if(found) {
//         res.json({ msg: 'product deleted', productSchema: productSchema.filter(product => product.articleNumber !== parseInt(req.params.articleNumber))});
//     } 
//     else {
//         res.status(400).json({ msg: `No product with the articleNumber of ${req.params.articleNumber}`})
//     }
// });


module.exports = router;