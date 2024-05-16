const { Router } = require('express');

const postFill=require('../controllers/postFill');
const getFill = require('../controllers/getFill');


const router = Router();

router.get('/healthCheck',(req,res)=>{
    res.json({message:"All good :D"})
})
router.post('/fill',postFill)

router.get('/articles', getFill)









router.post('/createArticle',postCreateArticle)

module.exports = router;