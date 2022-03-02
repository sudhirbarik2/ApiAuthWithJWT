const router = require('express').Router();
const User = require('../model/Users');
const Joi = require('@hapi/joi')
const bcrypt= require('bcryptjs')
const { registerValidation, loginValidation } = require('../Validation')
//Validation


router.post('/register', async (req, res) => {
    //Validating
    const error = registerValidation(req.body)
    if (error) res.send(error.details[0].message)
    else {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt)
        const emailExist=await User.findOne({email: req.body.email})
        console.log(emailExist);
        if(emailExist) return res.status(400).send("Email already exist")
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        try {
            const savedUser = await user.save();
            res.send({User:savedUser._id+ " logged in uccessfully  "})
        } catch (err) {
            res.status(400).send(err)
        }
    }
});
router.post('/login',async(req,res)=>{
    const error=loginValidation(req.body)
    if(error) res.send(error.details[0].message);
    else{
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("Email Id not registered ! Please register first !!");
        const validPassword= await bcrypt.compare(req.body.password,user.password)
        if(validPassword) return res.status(200).send("Logged in Successfully !");
        res.status(400).send("Wrong Password")
        
    }
});


module.exports = router;