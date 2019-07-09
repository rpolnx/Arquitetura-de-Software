const Product = require('../models/persistance/Product');
const Supplier = require('../models/persistance/Supplier');
const Category = require('../models/persistance/Category');

class ProductService {
    async getProductsFromDb(productId) {
        const productList = (typeof productId === 'undefined') ? await Product.findAll() : await Product.findByPk(productId)
        return productList;
    }

    async createProduct(body) {
        const product = await Product.create(body);
        return product;
    }

    async updateProduct(body, productId) {
        const numberOfUpdatedProducts = await Product.update(body, {
            where: {
                id: productId
            }
        });
        return numberOfUpdatedProducts[0];
    }

    async deleteProduct(productId) {
        const numberOfDeletions = await Product.destroy({
            where: {
                id: productId
            }
        });
        return numberOfDeletions;
    }

    async verifySupplierAndCategory(body) {
        const supplier = await Supplier.findByPk(body.supplier);
        let category = await Category.findByPk(body.category);
        if (supplier === null && category === null) {
            return { validate: false, message: "Category and Supplier was not found" }
        }
        if (supplier == null) {
            return { validate: false, message: "Supplier was not found" }
        }
        if (category === null) {
            return { validate: false, message: "Category was not found" }
        }
        return { validate: true, price: category.price }
    }
}

module.exports = new ProductService();
