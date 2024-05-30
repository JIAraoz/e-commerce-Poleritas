const {User} =require('../../db')

const getUser = async(req,res) => {
    try {
        const response = await User.findAll();

        console.log(response);
        if(response.length!==0){
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

module.exports = getUser;