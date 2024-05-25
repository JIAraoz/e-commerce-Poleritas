const {Size}=require('../../db')
const postSize=async(req,res)=>{
try {
    const size=req.body.sizeType
    if(!size)return res.status(400).json({message:"Faltan datos o son inválidos en el cuerpo de la solicitud"})
    const newSize=await Size.create({
        sizeType:size
    })
    res.status(201).json({message:'Size creado con éxito',result:newSize})
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error interno del servidor' });
}
}
module.exports=postSize