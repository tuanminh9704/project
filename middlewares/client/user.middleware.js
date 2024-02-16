const User = require("../../models/user");

module.exports.loginPost = async (req, res, next) => {
    const tokenUser = req.cookies.tokenUser;
    // console.log(tokenUser);

    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted: false,
    })

    // console.log(user);

    if(user){
        res.locals.user = user;
    }

    next();
}


