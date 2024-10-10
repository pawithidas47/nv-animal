const { Animal: AnimalModel } = require('../models');

module.exports = {
    // get all Animal
    async index(req, res) {
        try {
            const animals = await AnimalModel.findAll();
            res.send(animals);
        } catch (err) {
            res.status(500).send({
                error: 'The Animal information was incorrect'
            });
        }
    },
    // create Animal
    async create(req, res) {
        try {
            const animal = await AnimalModel.create(req.body);
            res.send(animal.toJSON());
        } catch (err) {
            res.status(500).send({
                error: 'Create Animal incorrect'
            });
        }
    },
    // edit Animal, suspend, active
    async put(req, res) {
        try {
            await AnimalModel.update(req.body, {
                where: {
                    id: req.params.AnimalId
                }
            });
            res.send(req.body);
        } catch (err) {
            res.status(500).send({
                error: 'Update Animal incorrect'
            });
        }
    },
    // delete Animal
    async remove(req, res) {
        try {
            const animal = await AnimalModel.findOne({
                where: {
                    id: req.params.AnimalId
                }
            });
            if (!animal) {
                return res.status(403).send({
                    error: 'The Animal information was incorrect'
                });
            }
            await animal.destroy();
            res.send(animal);
        } catch (err) {
            res.status(500).send({
                error: 'The Animal information was incorrect'
            });
        }
    },
    // get Animal by id
    async show(req, res) {
        try {
            const animal = await AnimalModel.findByPk(req.params.AnimalId);
            if (!animal) {
                return res.status(404).send({
                    error: 'Animal not found'
                });
            }
            res.send(animal);
        } catch (err) {
            res.status(500).send({
                error: 'The Animal information was incorrect'
            });
        }
    }
};
