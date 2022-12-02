import express from 'express';
const router = express.Router();
import Category from '../models/category.js';
import Company from '../models/company.js';
import isAuth from './auth.js';

/**
 * @swagger
 * definitions:
 *  Category:
 *   type: object
 *   properties:
 *    categoryName:
 *     type: string,
 *     description: The name of the category
 *     example: Fashion  
 */


/**
 * @swagger
 * /api/company/create_category:
 *  post:
 *   summary: Create new category
 *   description: Use this route to create new category
 *   tags: [Store]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Category'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
router.post('/create_category', async(req,res) => {
    const categoryName = req.body.categoryName;
    Category.create({
        categoryName: categoryName
    })
    .then(category_created => {
        return res.status(200).json({
            message: category_created
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})


/**
 * @swagger
 * /api/company/get_categories:
 *  get:
 *   summary: Get a list of all categories
 *   description: This is some description about getting all categories
 *   tags: [Store]
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *    500:
 *     description: Error in this operation
 */
router.get('/get_categories', async(req,res) => {
    Category.findAll()
    .then(categories => {
        return res.status(200).json({
            message: categories
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

/**
 * @swagger
 * /api/company/get_category_by_id/{id}:
 *  get:
 *   summary: Get single category by category id
 *   description: Get single category by category id
 *   tags: [Store]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: Type the category id
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Error in operation
 */
router.get('/get_category_by_id/:id', async(req,res) => {
    const categoryId = req.params.id;
    Category.findByPk(categoryId)
    .then(category => {
        return res.status(200).json({
            message: category
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})



router.put('/update_category', async(req,res) => {

})
router.delete('/delete_category/:categoryId', async(req,res) => {
    const categoryId = req.params.categoryId;
    Category.findByPk(categoryId)
    .then(category => {
        category.destroy()
        .then(removed => {
            return res.status(200).json({
                message: 'Category removed from DB'
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})


///////////////////////////////////////////////COMPANY
router.post('/create_company', async(req,res) => {
    const {
        companyName,
        companyLogo,
        address, city, phone, email, bio, categoryId
    } = req.body;

    Company.create({
        companyName: companyName,
        companyLogo: companyLogo,
        address: address,
        city: city,
        phone: phone,
        email: email,
        bio: bio,
        categoryId: categoryId
    })
    .then(company_created => {
        return res.status(200).json({
            message: company_created
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})
router.get('/get_companies', async(req,res) => {
    Company.findAll()
    .then(companies => {
        return res.status(200).json({
            message: companies
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

export default router;