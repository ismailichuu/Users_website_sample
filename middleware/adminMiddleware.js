//logger
export const loggerAdmin = (req, res, next) => {
    if(!req.session.admin){
        return res.redirect('/admin/login');
    };
    next();
};

//PreventLogin relogin
export const sessionCheckAdmin = (req, res, next) => {
    if(req.session.admin){
        return res.redirect('/admin');
    };
    next();
};