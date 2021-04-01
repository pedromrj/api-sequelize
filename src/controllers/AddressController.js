const Address = require("../models/Address");
const User = require("../models/User");
const { index } = require("./UserController");

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;

        const user = await User.findByPk( user_id, {
            include: { association: "addresses"}
        })

        return response.json(user).status(200);
    },
    async store(request, response) {
        const { user_id } = request.params;
        const { zipcode, street, number } = req.body;


        const user = await User.findByPk(user_id);

        if (!user) {
            return response.status(404).json({error: "User not found"});
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        })

        return response.json(address).status(201);
    }
}