//store, index, show, update, destroy
//cria usuário(tela web e mobile)

const User = require('../models/User');

module.exports = {
    async store(req,res) {
        const { email } = req.body; // é igual à const email = req.body.email. {} controi destruturalização.
        
        let user = await User.findOne({ email });

        if(!user) {
            const user = await User.create( {email} );
        }
      
        return res.json(user);
    }
};