const { Router } = require('express');
const postFill=require('../controllers/postFill')
const postCreateArticle=require('../controllers/postCreateArticle')
const router = Router();

router.get('/healthCheck',(req,res)=>{
    res.json({message:"All good :D"})
})
router.post('/fill',postFill)











router.post('/createArticle',postCreateArticle)

module.exports = router;