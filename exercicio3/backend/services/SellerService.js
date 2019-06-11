const Seller = require('../models/persistance/Seller');

class SellerService {
    async getSellerFromDB(sellerId) {
        const sellerList = (typeof sellerId === 'undefined') ? await Seller.findAll() : await Seller.findByPk(sellerId)
        return sellerList;
    }

    async createSeller(body) {
        body.admission = new Date();
        const seller = await Seller.create(body);
        return seller;
    }

    async updateSeller(body, sellerId) {
        const numberOfUpdatedSeller = await Seller.update(body, {
            where: {
                id: sellerId
            }
        });
        return numberOfUpdatedSeller[0];
    }

    async deleteSeller(sellerId) {
        const numberOfDeletions = await Seller.destroy({
            where: {
                id: sellerId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new SellerService();
