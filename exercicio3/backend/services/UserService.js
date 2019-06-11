const User = require('../models/persistance/User');

class UserService {
    async getUserFromDB(userId) {
        const supplierList = (typeof userId === 'undefined') ? await User.findAll() : await User.findByPk(userId)
        return supplierList;
    }

    async createUser(body) {
        const supplier = await User.create(body);
        return supplier;
    }

    async updateUser(body, supplierId) {
        const numberOfUpdatedSuppliers = await User.update(body, {
            where: {
                id: supplierId
            }
        });
        return numberOfUpdatedSuppliers[0];
    }

    async deleteUser(supplierId) {
        const numberOfDeletions = await User.destroy({
            where: {
                id: supplierId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new UserService();
