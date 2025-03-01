import session from "express-session";
import User from "../models/SignupSchema.js";
import bcrypt from 'bcrypt';

//@desc gethomepage
//@route GET /
export const getHomePage = (req, res) => {
    res.render('user/home');
};

//@desc getLogin page
//@route GET /login
export const getLogin = (req, res) => {
    res.render('user/login', { msg: null });
};

//@desc Handle Login
//@route POST /login
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) throw ('User Not Found');

        const checkPassword = await bcrypt.compare(password, userExist.password);
        if (!checkPassword) throw ('Invalid Credentials');
        req.session.user = email;
        res.redirect('/');
    } catch (error) {
        res.render('user/login', { msg: error });
    }
};

//@desc getSignup
//@route GET /signup
export const getSignup = (req, res) => {
    res.render('user/signup', { msg: null });
};

//@desc Signup handling
//@route POST /signup
export const handleSignup = async (req, res) => {

    try {

        const { name, email, password1, password2 } = req.body;
        if (password1 !== password2) throw new Error('Password not Match');

        //Checking user exist or not
        const userExist = await User.findOne({ email });
        if (userExist) throw ('User is already registered');

        if(password1.length < 6) throw new Error('Password Must be 6 Characters');

        //password hashing
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password1, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });

        await newUser.save();
        console.log('signup successful');
        req.session.user = { email, name };
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('user/signup', { msg: error.toString() });
    };
};

//@desc Handle Logout
//@route GET /logout
export const handleLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};