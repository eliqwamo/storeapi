import express from 'express';
const router = express.Router();
import bcryptjs from 'bcryptjs';
import Account from '../models/account.js';
import jwt from 'jsonwebtoken';
import isAuth from './auth.js';

//CRUD :: Create Read Update Delete

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
            const code = generateRandomIntegerInRange(1000,9999);
            //Create new aacount
            Account.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                isApproved: false,
                passcode: code
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

router.put('/verify', async(req,res) => {
    const {email,code} = req.body;
    Account.findAll({where: {email:email}})
    .then(accounts => {
        if(accounts.length == 0){
            return res.status(200).json({
                message: 'Account not exist'
            })
        } else {
            const user = accounts[0];
            if(code == user.passcode){
                user.isApproved = true;
                user.save()
                .then(verivied => {
                    return res.status(200).json({
                        message: verivied
                    })
                })
            } else {
                return res.status(200).json({
                    message: 'Code not match'
                })
            }
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

//FRIDAY
router.post('/login', async(req,res) => {
    //Get data
    const {email,password} = req.body;
    //Check if exist
    Account.findAll({where: {email:email}})
    .then(async accounts => {
        if(accounts.length > 0){
            const user = accounts[0];
            //Check password
            const isMatch = await bcryptjs.compare(password, user.password);
            if(isMatch ){
                //Check if account verified
                if(user.isApproved){
                    //Create Token
                    const data = {
                        id: user.id,
                        name: user.firstName + ' ' + user.lastName,
                        email: user.email
                    }
                    const token = await jwt.sign({data}, 'tQEai5iis6QBHpNfXLg5NALzAK0GS6Ee');
                    return res.status(200).json({
                        user: user,
                        token: token
                    })

                    //Response
                } else {
                    return res.status(200).json({
                        message: 'Account was not verified'
                    })
                }
            } else {
                return res.status(200).json({
                    message: 'Password not match'
                })
            }
        } else {
            return res.status(200).json({
                message: 'Account not found'
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
router.get('/get_all_users', isAuth, async(req, res) => {

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


//UPDATE ACCOUNT
router.put('/update_account', isAuth, async(req,res) => {

    const id = req.account.id;

    const {firstName,lastName} = req.body;
    Account.findByPk(id)
    .then(account => {
        account.firstName = firstName;
        account.lastName = lastName;
        account.save()
        .then(account_updated => {
            return res.status(200).json({
                message: account_updated
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

//DELETE ACCOUNT
router.delete('/delete_account/:accountid', isAuth,  async(req,res) => {
    const x = req.params.accountid;
    Account.findByPk(x)
    .then(account => {
        account.destroy()
        .then(removed => {
            return res.status(200).json({
                message: 'Account removed from DB'
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.get('/getAccountById/:accountId', isAuth, async(req,res) => {
    const id = req.params.accountId;
    Account.findByPk(id)
    .then(account => {
        return res.status(200).json({
            message: account
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})


function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default router;