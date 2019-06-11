const Supplier = require('../models/Supplier');

class SellerService {
    async getSupplierFromDB(supplierId) {
        const supplierList = (typeof supplierId === 'undefined') ? await Supplier.findAll() : await Supplier.findByPk(supplierId)
        return supplierList;
    }

    async createSupplier(body) {
        const supplier = await Supplier.create(body);
        return supplier;
    }

    async updateSupplier(body, supplierId) {
        const numberOfUpdatedSuppliers = await Supplier.update(body, {
            where: {
                id: supplierId
            }
        });
        return numberOfUpdatedSuppliers[0];
    }

    async deleteSupplier(supplierId) {
        const numberOfDeletions = await Supplier.destroy({
            where: {
                id: supplierId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new SellerService();
