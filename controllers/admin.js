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
    .then(async companies => {

        const products = await Product.findAll();

        //companies
        //products

        let companiesAndProducts = [];

        companies.forEach(company => {
            const companyProducts = products.filter(x => x.companyId == company.id);
            let companyItem = {
                companyInfo: company,
                products: companyProducts
            };
            companiesAndProducts.push(companyItem);
        })

        //console.log(JSON.stringify(companiesAndProducts));
        res.render('companies', {
            companiesAndProducts: companiesAndProducts
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

router.get('/companies/products/:id', async(req,res) => {

    const companyId = req.params.id;
    const products = await Product.findAll({where: {companyId: companyId}})
    res.render('company_products', {
        products: products
    })
})

router.get('/products/:id', async(req,res) => {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    res.render('product_details', {
        product: product
    })
})


router.post('/create_new_product', async(req,res) => {
    const {
        productName,
        productPrice,
        productDescription,
        productImage,
        unitInStock,
        categoryId,
        companyId
    } = req.body;

    Product.create({
        productName: productName,
        productPrice: productPrice,
        productDescription: productDescription,
        productImage: productImage,
        unitInStock: unitInStock,
        categoryId: categoryId,
        companyId: companyId
    })
    .then(product_created => {
        console.log(product_created);
        res.redirect('/admin/products');
    })
    .catch(error => {
        res.redirect('/admin/products');
        console.log(error);
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