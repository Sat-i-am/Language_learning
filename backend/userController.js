
const Users = require("./usermodel");
module.exports.register = async(req,res,next) =>{
    try{
        console.log(req)
        const {name, mail, password} = req.body;
        const checkUser = await Users.findOne({name});

        if( checkUser )
            return res.json({msg:"user already exist", status: false})
        const user = await Users.create({
            name,
            mail,
            password,
        })
        console.log(user);
        return res.json({status: true, user});
    } catch(err) {
        next(err);
    }
}
module.exports.login = async(req, res, next)=> {
    console.log("you logged in")
}
module.exports.chooseLang = async(req, res, next) => {
    console.log("you chose Lang in")
}
module.exports.displayEnglish_questions = async(req, res, next) => {
    console.log("you chose easy in")
    return res.json({English_questions});
}

