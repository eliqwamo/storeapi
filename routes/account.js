import express from 'express';
const router = express.Router();
import bcryptjs from 'bcryptjs';
import Account from '../models/account.js';

//CREATE NEW ACCOUNT
router.post('/create_new_account', async(req,res) => {

    //Get user data
    const {firstName,lastName,email,password} = req.body;

    //Check if user exist
    Account.findAll({where: {email:email}})
    .then(async accounts => {

        if(accounts.length == 0){
            //Crypt username password
            const hash = await bcryptjs.hash(password,10);
            //Create new aacount
            Account.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                isApproved: false
            })
            .then(account_created => {
                return res.status(200).json({
                    message: account_created
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message
                })
            })
        } else {
            return res.status(200).json({
                message: 'Account not available'
            })
        }

    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})


//GET ALL ACCOUNTS
router.get('/get_all_users', async(req, res) => {
    Account.findAll()
    .then(users => {
        return res.status(200).json({
            message: users
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

export default router;