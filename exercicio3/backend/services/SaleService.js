const Sale = require('../models/Sale');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const Category = require('../models/Category');

class SaleService {
    async getSalesFromDb(saleId) {
        const saleList = (typeof saleId === 'undefined') ? await Sale.findAll() : await Sale.findByPk(saleId)
        return saleList;
    }

    async verifySellerAndProduct(body) {
        const seller = await Seller.findByPk(body.seller);
        const category = await Category.findByPk(body.category);
        let product = await Product.findByPk(body.product);
        if (seller === null && product === null && category === null) {
            return { validate: false, message: "Product and seller and category was not found" }
        }
        if (seller == null) {
            return { validate: false, message: "seller was not found" }
        }
        if (product === null) {
            return { validate: false, message: "Product was not found" }
        }
        if (category === null) {
            return { validate: false, message: "category was not found" }
        }
        if (product.minimal_quantity > body.quantity) {
            return { validate: false, message: `Minimal quantity is: ${product.minimal_quantity}.` }
        }
        if (product.quantity < body.quantity) {
            return { validate: false, message: `No enough products. Product left: ${product.quantity}.` }
        } else {
            product.quantity -= parseInt(body.quantity);
            await Product.update({ quantity: product.quantity }, {
                where: {
                    id: body.quantity
                }
            })
        }
        return { validate: true, price: product.value }
    }

    async createSale(body) {
        body.sale_time = new Date();
        const sale = await Sale.create(body);
        return sale;
    }

    async updateSale(body, saleId) {
        const numberOfUpdatedSales = await Sale.update(body, {
            where: {
                id: saleId
            }
        });
        return numberOfUpdatedSales[0];
    }

    async deleteSale(saleId) {
        const numberOfDeletions = await Sale.destroy({
            where: {
                id: saleId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new SaleService();
