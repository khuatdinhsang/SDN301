const Category = require("../models/CategoryModel")
const Product = require("../models/ProductModel")
const SubCategory = require("../models/SubCategoryModel")
const LIMIT_PRODUCT = 10
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, price, quantity, image, description,
                subCategoryId } = data
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: subCategoryId
            })
            if (!checkSubCategoryExists) {
                resolve({
                    status: 'ERR',
                    message: "SubCategoryId is not defined"
                })
            }
            if (checkSubCategoryExists) {
                const createProduct = await Product.create({
                    name,
                    price,
                    quantity,
                    image,
                    description,
                    subCategoryId,
                    categoryId: checkSubCategoryExists.categoryId
                })
                resolve({
                    status: 'OK',
                    message: 'Product created successfully',
                    data: createProduct
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const updateProduct = (id, data) => {
    const { subCategoryId } = data
    return new Promise(async (resolve, reject) => {
        try {
            const checkProductExists = await Product.findOne({
                _id: id
            })
            if (checkProductExists === null) {
                resolve({
                    status: 'ERR',
                    message: 'Product is not defined!'
                })
            }
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: subCategoryId
            })
            if (!checkSubCategoryExists) {
                resolve({
                    status: 'ERR',
                    message: "SubCategory is not defined"
                })
            }
            if (checkSubCategoryExists) {
                await Product.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: productId
            })
                .populate('subCategoryId')
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: `The product is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllProduct = (page = 1, limit = LIMIT_PRODUCT) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalProduct = await Product.count()
            const allProduct = await Product.find({})
                .skip(skipNumber)
                .limit(limit)
                .populate('subCategoryId')
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProduct,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.findByIdAndDelete({
                _id: productId
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
const getAllProductBySubCategoryId = (page = 1, limit = LIMIT_PRODUCT, subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalProduct = await Product.count({
                subCategoryId
            })
            const allProductBySubCategoryId = await Product.find({
                subCategoryId
            })
                .skip(skipNumber)
                .limit(limit)
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProductBySubCategoryId,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllProductByCategoryId = (page = 1, limit = LIMIT_PRODUCT, categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalProduct = await Product.count({
                categoryId
            })
            const allProductByCategoryId = await Product.find({
                categoryId
            })
                .skip(skipNumber)
                .limit(limit)
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProductByCategoryId,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const searchProductByName = (page = 1, limit = LIMIT_PRODUCT, searchProductByName) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalProduct = await Product.count({
                name: { $regex: searchProductByName, $options: 'i' }
            })
            const productByName = await Product.find({
                name: { $regex: searchProductByName, $options: 'i' }

            })
                .skip(skipNumber)
                .limit(limit)
                .populate('subCategoryId')
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })


            if (productByName === null) {
                resolve({
                    status: 'ERR',
                    message: `The product is not defined `
                })
            }
            resolve({
                status: 'OK',
                data: productByName,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createProduct, updateProduct,
    getDetailProduct, getAllProduct, deleteProduct,
    getAllProductBySubCategoryId, getAllProductByCategoryId, searchProductByName
}