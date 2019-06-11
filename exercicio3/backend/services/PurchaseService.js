const Purchase = require('../models/persistance/Purchase');
const Supplier = require('../models/persistance/Supplier');
const Product = require('../models/persistance/Product');
const Category = require('../models/persistance/Category');

class PurchaseService {
    async getPurchasesFromDb(purchaseId) {
        const purchasesList = (typeof purchaseId === 'undefined') ? await Purchase.findAll() : await Purchase.findByPk(purchaseId)
        return purchasesList;
    }

    async verifySupplierAndProduct(body) {
        const supplier = await Supplier.findByPk(body.supplier);
        const category = await Category.findByPk(body.category);
        let product = await Product.findByPk(body.product);
        if (supplier === null && product === null && category === null) {
            return { validate: false, message: "Product and supplier and category was not found" }
        }
        if (supplier == null) {
            return { validate: false, message: "Supplier was not found" }
        }
        if (product === null) {
            return { validate: false, message: "Product was not found" }
        }
        if (category === null) {
            return { validate: false, message: "Category was not found" }
        } else {
            product.quantity += parseInt(body.quantity);
            await Product.update({ quantity: product.quantity }, {
                where: {
                    id: body.product
                }
            })
        }
        return { validate: true, price: product.value }
    }

    async createPurchase(body) {
        body.purchase_time = new Date();
        const purchase = await Purchase.create(body);
        return purchase;
    }

    async updatePurchase(body, purchaseId) {
        const numberOfUpdatedPurchases = await Purchase.update(body, {
            where: {
                id: purchaseId
            }
        });
        return numberOfUpdatedPurchases[0];
    }

    async deletePurchase(purchaseId) {
        const numberOfDeletions = await Purchase.destroy({
            where: {
                id: purchaseId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new PurchaseService();
