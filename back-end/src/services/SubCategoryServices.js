const SubCategory = require("../models/SubCategoryModel")

const createSubCategory = (categoryId, data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, description } = data
        try {
            const checkSubCategoryExists = await SubCategory.findOne({
                name: name
            })
            if (checkSubCategoryExists !== null) {
                reject({
                    status: 'ERR',
                    message: 'SubCategory already exists!'
                })
            }
            const createSubCategory = await SubCategory.create({
                name,
                image,
                description,
                categoryId
            })
            resolve({
                status: 'OK',
                message: 'SubCategory created successfully',
                data: createSubCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}

const updateSubCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: id
            })
            if (checkSubCategoryExists === null) {
                reject({
                    status: 'ERR',
                    message: 'SubCategory is not defined!'
                })
            }
            await SubCategory.findByIdAndUpdate(id, data, { new: true })
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
const getDetailSubCategory = (subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const subCategory = await SubCategory.findOne({
                _id: subCategoryId
            })
            if (subCategory === null) {
                resolve({
                    status: 'ERR',
                    message: `The subCategory is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: subCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllSubCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSubCategory = await SubCategory.find({})
            resolve({
                status: 'OK',
                data: allSubCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllSubCategoryByCategoryId = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSubCategory = await SubCategory.find({
                categoryId
            })
            resolve({
                status: 'OK',
                data: allSubCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteSubCategory = (subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {

            await SubCategory.findByIdAndDelete({
                _id: subCategoryId
            })
            resolve({
                status: 'OK',
                messages: "Delete Successfully"
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createSubCategory,
    updateSubCategory, getDetailSubCategory,
    getAllSubCategory, getAllSubCategoryByCategoryId,
    deleteSubCategory

}