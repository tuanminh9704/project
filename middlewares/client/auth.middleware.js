const User = require("../../models/user");

module.exports.auth = async (req, res, next) => {
    if(!req.cookies.tokenUser){
        res.redirect(`/user/login`);
    }
    else{
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false
        })

        if(!user){
            res.redirect("/user/login");
        }
        else{
            next();
        }
    }
}