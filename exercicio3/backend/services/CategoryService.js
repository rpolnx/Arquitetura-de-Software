const Category = require('../models/persistance/Category');

class CategoryService {
    async getCategoriesFromDB(categoryId) {
        const categoryList = (typeof categoryId === 'undefined') ? await Category.findAll() : await Category.findByPk(categoryId);
        return categoryList;
    }

    async createCategory(body) {
        const category = await Category.create(body);
        return category;
    }

    async updateCategory(body, category_id) {
        const numberOfUpdatedCategories = await Category.update(body, {
            where: {
                id: category_id
            }
        });
        return numberOfUpdatedCategories[0];
    }

    async deleteCategory(categoryId) {
        const numberOfDeletions = await Category.destroy({
            where: {
                id: categoryId
            }
        });
        return numberOfDeletions;
    }
}

module.exports = new CategoryService();
