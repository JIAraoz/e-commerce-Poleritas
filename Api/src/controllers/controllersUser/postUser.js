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
                    userRol:req.body.userRol||'User'
                }
                
                const createdUser= await User.create(user)

                if (createdUser) {
                    const info = await transporter.sendMail({
                        from: '"Welcome to Poleritas!" <poleritas0@gmail.com>', // sender address
                        to: user.userEmail,
                        subject: "Welcome to Poleritas!", // Subject line
                        html: `
                        <h1>Welcome, ${user.userName}!</h1>
                        <p>Thank you for registering with <b>Poleritas</b>. We're excited to have you on board.</p>
                        <p><b>Your registered email:</b> ${user.userEmail}</p>
                        <p>Best regards,<br>Poleritas Team</p>
                    `, // html body
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