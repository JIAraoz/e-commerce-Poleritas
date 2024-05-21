
const { Router } = require('express');
const getCategory=require('../controllers/getCategory')
const postFill=require('../controllers/postFill');
const getFill = require('../controllers/getFill');
const postCreateArticle=require('../controllers/postCreateArticle');
const getById = require('../controllers/getById');
const postCategory =require('../controllers/postCategory')

const router = Router();

router.get('/healthCheck',(req,res)=>{
    res.json({message:"All good :D"})
})
router.post('/fill',postFill)

router.get('/articles', getFill)

router.get('/detail/:id', getById)

router.get('/getCategory',getCategory)

router.post('/createArticle',postCreateArticle)

router.post('/postCategory',postCategory)

module.exports = router;
