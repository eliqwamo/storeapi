import express from 'express';
const router = express.Router();

import Category from '../models/category.js';
import Company from '../models/company.js';
import Product from '../models/product.js';


router.get('/', async(req,res) => {
    res.render('index', {})
})



router.get('/categories', async(req,res) => {
    Category.findAll()
    .then(categories => {
        res.render('categories', {
            categories: categories
        })
    })
    .catch(error => {

    })
})



router.get('/companies', async(req,res) => {
    Company.findAll()
    .then(companies => {
        res.render('companies', {
            companies: companies
        })
    })
    .catch(error => {

    })
})


router.get('/products', async(req,res) => {

    const companies = await Company.findAll();
    const categories = await Category.findAll();

    Product.findAll()
    .then(products => {
        res.render('products', {
            products: products,
            companies: companies,
            categories: categories
        })
    })
    .catch(error => {

    })
})




router.get('/store', async(req,res) => {
    res.render('store', {
        student_name: 'Tali',
        today: 'Sunday'
    })
})



router.post('/create_new_company', async(req,res) => {
    const {
        companyName,companyLogo,address,
        city,phone,email
    } = req.body;
    Company.create({
        companyName: companyName,
        companyLogo: companyLogo,
        address: address,
        city: city,
        phone: phone,
        email: email,
        bio: ''
    })
    .then(category_created => {
        res.redirect('/admin/companies');
    })
    .catch(error => {
        console.log(error.message);
        res.redirect('/admin/companies');
    })
})





router.get('/remove_category/:id', async(req,res) => {

    const categoryId = req.params.id;

    Category.findByPk(categoryId)
    .then(category => {
        category.destroy()
        .then(removed => {
            res.redirect('/admin/categories');
        })
    })
    .catch(error => {
        console.log(error.message);
        res.redirect('/admin/categories');
    })


})
router.post('/create_new_category', async(req,res) => {
    const categoryName = req.body.categoryName;
    Category.create({
        categoryName: categoryName
    })
    .then(category_created => {
        res.redirect('/admin/categories');
    })
    .catch(error => {
        console.log(error.message);
        res.redirect('/admin/categories');
    })
})

export default router;