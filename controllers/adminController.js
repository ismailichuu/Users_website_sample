
import User from "../models/SignupSchema.js";
import bcrypt from 'bcrypt';

//@desc Admin home
//@route GET /
export const getAdminHome = async (req, res) => {
    const users = await User.find();
    res.render('admin/adminHome', { users });
};

//@desc User delete
//@route POST /delete
export const deleteUser = async (req, res) => {
    try {
        console.log(req.body.id)
        const userExist = await User.findById(req.body.id);
        if (!userExist) throw ('Cannot find User');
        await userExist.deleteOne();
        res.json(true);
    } catch (error) {
        console.log(error);
    };
};

//@desc add-user form
//@route GET /add-user
export const getAddUser = (req, res) => {
    res.render('admin/adduser', { title: 'Admin', msg: null });
};

//@desc handle add-user form
//@route POST /add-user
export const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (password.length < 6) throw new Error('Password Must be 6 or more character');
        //check userExist
        const userExist = await User.findOne({ email });
        if (userExist) throw ('User Already Exist');
        //hashpassword
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });
        await newUser.save();
        console.log('User Saved Succesfully');
        res.redirect('/admin');
    } catch (error) {
        res.render('admin/addUser', { msg: error, title: 'Admin' });
    }
};

//@desc edit user
//@route GET /edit
export const editUser = async (req, res) => {
    const user = await User.findOne({ _id: req.query.id });

    res.render('admin/editUser', { msg: null, title: 'Admin', user });
};

//@desc edit user
//@route POST /edit-user
export const handleEditUser = async (req, res) => {
    try {
        if(req.body.newpassword){
            const{newpassword}= req.body;
            if(newpassword.length < 6) throw new Error('Password must be 6 or long');
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(newpassword, saltRounds);
            req.body.password = hashPassword;
        }
        const { _id, name, email, password} = req.body;
        const user = await User.updateOne({_id}, {$set:{name, email, password}});
        res.redirect('/admin');
        
    } catch (error) {
        res.render('admin/editUser',{msg: error.toString(),title: 'Admin', user: req.body});
    };
};

//@desc Get admin Login
//@route GET /admin/login
export const getAdminLogin = (req, res) => {
    const logInErr = req.session.err || null ;
    req.session.user = null;
    res.render('admin/adminLogin',{title:'Admin', msg: logInErr});
};

//@desc handle admin login
//@route POST /admin/login
export const handleAdminLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        const adminExist = await User.findOne({email});
        
        if(!adminExist || !adminExist.admin) throw new Error('Cannot find admin');
        const passCheck =  await bcrypt.compare(password, adminExist.password);
        if(!passCheck) throw new Error('Invalid admin Credentials');
        req.session.admin = email;
        res.redirect('/admin');
    } catch (error) {
        req.session.err = error.toString();
        res.redirect('/admin/login');
    }
};

//@desc handle login
//@route GET /logout
export const handleAdminLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};