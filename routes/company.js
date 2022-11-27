import express from 'express';
const router = express.Router();
import Category from '../models/category.js';
import Company from '../models/company.js';
import isAuth from './auth.js';


////////////////////////////////////////////CATEGORY
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