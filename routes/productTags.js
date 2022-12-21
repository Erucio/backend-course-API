// Used Before MONGODB

// const express = require('express')
// let productSchema = require('../schemas/productSchema')
// const productTags = express.Router()


// productTags.param("articleNumber", (req, res, next, articleNumber) => {
//     req.product = productSchema.find(x => x.articleNumber == articleNumber)
//     next()
// })
// productTags.param("tag", (req, res, next, tag) => {
//     req.productSchema = productSchema.filter(x => x.tag == tag)
//     next()
// })

// productTags.route('/details/:articleNumber').get((req, res) => {
//     if(req.product != undefined)
//         res.status(200).json(req.product)
//     else
//         res.status(404).json()
// })

// productTags.route('/:tag').get((req, res) => {
//     if(req.productSchema != undefined)
//         res.status(200).json(req.productSchema)
//     else
//         res.status(404).json()
// })

// productTags.route('/:tag/:take').get((req, res) => {
//     let list = []
//     for (let i = 0; i < Number(req.params.take); i++)
//         list.push(req.productSchema[i])
    
//     res.status(200).json(list)
// })

// productTags.route('/').get((req, res) => {
//     res.status(200).json(productSchema)
// })

// module.exports = productTags;