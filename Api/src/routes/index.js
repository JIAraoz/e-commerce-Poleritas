const { Router } = require('express');
const router = Router();

router.get('/healthCheck',(req,res)=>{
    res.json({message:"All good :D"})
})











module.exports = router;