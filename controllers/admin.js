import express from 'express';
const router = express.Router();

import Category from '../models/category.js';

router.get('/', async(req,res) => {
    Category.findAll()
    .then(categories => {
        res.render('index', {
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



router.post('/create_new_category', async(req,res) => {
    const categoryName = req.body.categoryName;
    Category.create({
        categoryName: categoryName
    })
    .then(category_created => {
        res.redirect('/admin');
    })
    .catch(error => {
        console.log(error.message);
        res.redirect('/admin');
    })
})

export default router;