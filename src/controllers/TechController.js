const User = require("../models/User");
const Tech = require("../models/Tech");

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;

        const user = await User.findByPk( user_id, {
            include: { association: "techs", through: { attributes: [] }}
        });

        return response.json(user).status(200);
    },
    async store(request, response) {
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return response.status(404).json({error: "User not found"});
        }

        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        await user.addTech(tech);

        return response.json(tech).status(201);
    },

    async delete(request, response) {
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return response.status(404).json({error: "User not found"});
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        await user.removeTech(tech);

        return response.json();
    }

}