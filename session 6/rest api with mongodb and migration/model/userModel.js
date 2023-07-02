const { DB_CONFIG } = require('../config/constants')

const { getCollection } = require('../db')

const ObjectID = require('mongodb').ObjectId;

class UserModel {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        const result = await getCollection(DB_CONFIG.COLLECTION_USER).insertOne({
            name: this.name,
            email: this.email,
            password: this.password,
        });
        this._id = result.insertedId;
        return this;
    }

    static async create({ name, email, password }) {
        const user = new UserModel(name, email, password);
        await user.save();
        return user;
    }

    static async update(id, updates) {
        const result = await getCollection(DB_CONFIG.COLLECTION_USER).findOneAndUpdate(
            { _id: new ObjectID(id) },
            { $set: updates },
            { returnDocument: 'after' }
        );

        return result.value;
    }

    static async deleteById(id) {
        const result = await getCollection(DB_CONFIG.COLLECTION_USER).deleteOne({ _id: new ObjectID(id) });
        return result.deletedCount > 0;
    }

    static async findById(id) {
        const user = await getCollection(DB_CONFIG.COLLECTION_USER).findOne({ _id: new ObjectID(id) });
        return user;
    }

    static async findByEmail(email) {
        
        const user = await getCollection(DB_CONFIG.COLLECTION_USER).findOne({ email });
        return user;
    }

    static async findByName(name) {
        const user = await getCollection(DB_CONFIG.COLLECTION_USER).findOne({ name });
        return user;
    }

    static async getAll() {
        const users = await getCollection(DB_CONFIG.COLLECTION_USER).find().toArray()
        return users;
    }

}

module.exports = UserModel;
