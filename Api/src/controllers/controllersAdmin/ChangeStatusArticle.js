const {Article}=require('../../db')

const ChangeStatusArticle=async(req,res)=>{
    try {
        const status=req.query.status
        const id=req.query.id
        const article= await Article.findByPk(id)
        if (article===null) {
            return res.status(404).json({message:"The item you want has not been found"})
        }else{
            article.isActive=status
            article.save()
            return res.status(200).json({message:"item status changed successfully"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports=ChangeStatusArticle