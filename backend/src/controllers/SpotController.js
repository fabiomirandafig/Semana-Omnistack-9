//store, index, show, update, destroy
//cria os spots do usuario cadastrado(tela da web) e retorna a listagem dos spots de acordo com a tecnologia(tela do mobile)

const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const tech = req.query.tech;

        const spots = await Spot.find({ techs:tech });

        return res.json(spots);
    },

    async store(req,res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers; 

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({ error: 'User does not exists' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    }
};