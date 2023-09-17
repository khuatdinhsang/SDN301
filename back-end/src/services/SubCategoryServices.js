const SubCategory = require("../models/SubCategoryModel")

const createSubCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = data
        try {
            const checkCategoryExists = await SubCategory.findOne({
                name: name
            })
            console.log("10", checkCategoryExists)
            if (checkCategoryExists !== null) {
                reject({
                    status: 'ERR',
                    message: 'SubCategory already exists!'
                })
            }
            const createCategory = await Category.create({
                name,
                image
            })
            resolve({
                status: 'OK',
                message: 'Category created successfully',
                data: createCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createSubCategory
}