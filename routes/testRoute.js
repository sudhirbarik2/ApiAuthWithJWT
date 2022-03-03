const router = require('express').Router();
const checkToken=require('./checkJWTToken');
const User = require('../model/Users');
router.get('/test',checkToken,(req,res)=>{
    console.log("Testing");
    // const user=User.findOne({_id: req.user})
    res.json(req.user.id)
    // res.send(user)
})






module.exports = router;