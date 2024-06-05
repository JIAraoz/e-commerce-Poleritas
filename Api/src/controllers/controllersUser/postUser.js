const {User, transporter} =require('../../db')

const postUser=async(req,res)=>{
    try {
        if (!req.body.userName||!req.body.userEmail||!req.body.userImage) {
            return res.status(400).json({message:"user data is missing"})
        }
        else{
            const userCheck= await User.findOne({
                where:{
                    userEmail:req.body.userEmail
                }
            })
            if (userCheck===null) {
                const user={
                    userName:req.body.userName,
                    userEmail:req.body.userEmail,
                    userImage:req.body.userImage,
                    userRol:req.body.userRol||'Admin'
                }
                
                const createdUser= await User.create(user)

                if (createdUser) {
                    const info = await transporter.sendMail({
                        from: '"Welcome to Poleritas!" <mateo.giampietro.10@gmail.com>', // sender address
                        to: user.userEmail,
                        subject: "Welcome to Poleritas!", // Subject line
                        text: "Hello world?", // plain text body
                        html: "<b>Hello world?</b>", // html body
                    });
                }

                return res.status(201).json({
                    result:createdUser
                })
            }else{
                return res.status(200).json({
                    result:userCheck
                })
            }

          

        }
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server error: '+ error.message})
    }
}
module.exports=postUser