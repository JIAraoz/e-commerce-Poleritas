const {User} =require('../../db')

const getUserByEmail = async (req, res) => {
    try {
        const emailQuery = req.query.email;

        const response = await User.findOne({
            where: {
                userEmail: emailQuery
            }
        })

        if(response){
            res.status(200).json({
                message: 'Data successfully obtained',
                result: response
            });
        }else{
            return res.status(404).json({ message: 'No elements with this characteristic have been found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Server error: '+ error.message})
    }
}

module.exports = getUserByEmail