import express from 'express';
import router from './routes/user.js';
import path from 'path';
import {fileURLToPath} from 'url';
import adminRouter from './routes/admin.js';
import mongoConnect from './config/configDB.js';
import session from 'express-session';
import nocache from 'nocache';

const app = express();
const port = process.env.PORT || 8000;

//nocache
app.use(nocache());

//session setting
app.use(session({
    secret : 'batman',
    resave : false,
    saveUninitialized : true,
    cookie: {
        secure : false,
        httpOnly : true,
    }
}));

//path setting
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');

//admin( route
app.use('/admin', adminRouter);

//route
app.use(router);

//listen
mongoConnect().then(() => {
    app.listen(port, () => console.log("Server running at", port))
});