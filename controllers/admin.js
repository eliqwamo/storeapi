import express from 'express';
const router = express.Router();

router.get('/', async(req,res) => {

    const students = [
        {
            name: 'Tali'
        },
        {
            name: 'Ester'
        },
        {
            name: 'Bushra'
        }
    ]

    res.render('index', {
        students: students
    })
})

router.get('/store', async(req,res) => {
    res.render('store', {
        student_name: 'Tali',
        today: 'Sunday'
    })
})

export default router;