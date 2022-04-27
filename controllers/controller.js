const Users = require('../models/db.js')
const objectId = require('mongoose').Types.ObjectId;

module.exports.getUsers = async (req, res) => {
    const users = await Users.find();

    if (users.length < 1) {
        res.status(404)
        throw new Error("Empty DB")
    }

    return users
}

module.exports.createUser = async (req, res) => {
    try {
        const user = await Users.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });

        return user;

    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports.getUser = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        throw new Error('Badly formatted Id')
    }

    if (!req.params.id) {
        throw new Error('No Id present in url')
    }

    const user = await Users.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    return user
}

module.exports.deleteUser = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        res.staus(400)
        throw new Error('Badly formatted Id')
    }

    if (!req.params.id) {
        res.staus(400)
        throw new Error('No Id present in url')
    }

    const user = await Users.findById(req.params.id);

    if (!user) {
        res.staus(400)
        throw new Error('User not found')
    }

    await Users.findByIdAndDelete(req.params.id);

    return {
        message: "Deleted user"
    }

}

module.exports.updateUser = async (req, res) => {
    if (!objectId.isValid(req.params.id)) {
        res.staus(400)
        throw new Error('Badly formatted Id')
    }

    if (!req.params.id) {
        res.staus(400)
        throw new Error('No Id present in url')
    }

    const user = await Users.findById(req.params.id);

    if (!user) {
        res.staus(400)
        throw new Error('User not found')
    }
    const name = user.name;
    const age = user.age;
    const email = user.email;

    const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
        name: req.body.name ? req.body.name : name,
        age: req.body.age ? req.body.age : age,
        email: req.body.email ? req.body.email : email,
    }, {
        new: true,
        runValidators: true
    })

    return updatedUser

}