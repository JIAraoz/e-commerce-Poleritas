const { Router } = require('express');
const postFill=require('../controllers/postFill')

const router = Router();

router.get('/healthCheck',(req,res)=>{
    res.json({message:"All good :D"})
})
router.post('/fill',postFill)










module.exports = router;