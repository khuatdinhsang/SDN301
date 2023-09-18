const Category = require("../models/CategoryModel")

const createCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = data
        try {
            const checkCategoryExists = await Category.findOne({
                name: name
            })
            console.log("10", checkCategoryExists)
            if (checkCategoryExists !== null) {
                reject({
                    status: 'ERR',
                    message: 'Category already exists!'
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
const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategoryExists = await Category.findOne({
                _id: id
            })
            if (checkCategoryExists === null) {
                reject({
                    status: 'ERR',
                    message: 'Category is not defined!'
                })
            }
            await Category.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: categoryId
            })
                .populate('categoryId')

            if (category === null) {
                resolve({
                    status: 'ERR',
                    message: `The category is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: category
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCategory = await Category.find({})
                .populate('categoryId')
            resolve({
                status: 'OK',
                data: allCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createCategory, updateCategory, getDetailCategory, getAllCategory
}