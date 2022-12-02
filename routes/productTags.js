let products = require('../data/Products')
const express = require('express')
const productTags = express.Router()


productTags.param("articleNumber", (req, res, next, articleNumber) => {
    req.product = products.find(x => x.articleNumber == articleNumber)
    next()
})
productTags.param("tag", (req, res, next, tag) => {
    req.products = products.filter(x => x.tag == tag)
    next()
})

productTags.route('/details/:articleNumber').get((req, res) => {
    if(req.product != undefined)
        res.status(200).json(req.product)
    else
        res.status(404).json()
})

productTags.route('/:tag').get((req, res) => {
    if(req.products != undefined)
        res.status(200).json(req.products)
    else
        res.status(404).json()
})

productTags.route('/:tag/:take').get((req, res) => {
    let list = []
    for (let i = 0; i < Number(req.params.take); i++)
        list.push(req.products[i])
    
    res.status(200).json(list)
})

productTags.route('/').get((req, res) => {
    res.status(200).json(products)
})

module.exports = productTags;