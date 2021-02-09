const User = require('../models/user');

module.exports.renderRegisterForm = (req, res)=>{
    res.render('users/register')
}

module.exports.renderLogin = (req, res)=>{
    res.render('users/login')
}

module.exports.register = async (req, res, next)=>{
    try {
    const {email, username, password} = req.body
    const newuser = await new User({email, username})
    const registereduser = await User.register(newuser, password);
    req.login(registereduser, err => {
        if(err) return next(err)
    });
    req.flash('success', 'Welcome to YelpCamp')
    res.redirect('/campgrounds')
    }
    catch(e){
        req.flash('error', e.message)
        res.redirect('/register')
    }
    
}

module.exports.login = (req, res)=>{
    req.flash('success', 'Logged in');
    const targeturl = req.session.returnto || '/campgrounds';
    delete req.session.returnto;       
    res.redirect(targeturl);     
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out')
    res.redirect('/campgrounds')
}