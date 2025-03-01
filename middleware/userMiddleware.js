//logger
export const logger = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/login');
    };
    next();
};

//PreventLogin relogin
export const sessionCheck = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    };
    next();
};