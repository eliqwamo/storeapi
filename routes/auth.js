import jwt from 'jsonwebtoken';
import Account from '../models/account.js';

export default (req,res,next) => {

    const header = req.headers['authorization'];
    if(header){

        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'tQEai5iis6QBHpNfXLg5NALzAK0GS6Ee', (err, authdata) => {
            if(err){
                return res.sendStatus(403);
            } else {
                Account.findByPk(authdata.data.id)
                .then(user => {
                    req.account = user;
                    next();
                })
                .catch(error => {
                    return res.status(500).json({
                        message: error.message
                    });
                })
            }
        })

    } else {
        return res.sendStatus(403);
    }

}