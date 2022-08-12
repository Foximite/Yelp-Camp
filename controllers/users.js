const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('users/register')}


module.exports.register = async (req, res, next) => {
    try{
    const {email, username, password} = req.body
    const user = new User({email, username})
    const registerdUser = await User.register(user, password);
    req.login(registerdUser, function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Welcome to Yelp Camp!')
        res.redirect('/campgrounds')      });
    } catch(e){
        req.flash('error', 'A user with that username already exists')
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectTo || '/campgrounds');
    delete req.session.returnTo;
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Goodbye");
      res.redirect("/campgrounds");
    });
  }