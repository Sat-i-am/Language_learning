
const User = require("./usermodel");
module.exports.register = async(req,res,next) =>{
    try{
        console.log(req)
        const {username, mail, password} = req.body;
        const checkuser = await User.findOne({ username });//checking if there is a username that matches with this entered
        if(checkuser)
            return res.json({msg: "Username already exists", status: false });
        const user = await User.create({
            username,
            mail,
            password,
        })
        console.log(user);
        
        return res.json({status: true, user});
    } catch(err) { 
        next(err);
    }
}
module.exports.login = async (req,res,next) => { //in this 'req' data is coming from front end when we did post request
    try{
        const { username, password } = req.body;
        console.log(username)
        const user = await User.findOne({ username });//checking if there is a username that matches with this entered
        console.log(user);
        if(!user)
            return res.json({msg: "Incorrect username or password", status: false });

        
        if( password != user.password ) //checking if entered password matches with the password already stored
            return res.json({msg: "Incorrect username or password", status: false})
                
        return res.json({status: true, user});
    } catch (err){
        next(err);
    }
}; 
module.exports.chooseLang = async(req, res, next) => {
    console.log(req.body)
    const { username, currentLang, _id} = req.body;
    const language = currentLang;
    const userid = _id;
        const user = await User.findOne({username});//after finding the user in database
        if( !user )
            return res.json({msg: "user not found"});
    //console.log(user);
    try{
        const updatedUser = await User.findByIdAndUpdate( //updating using userid
            userid,
            {$set: {language}},
            {new: true} //this is to return the updated values
        ) 
        return res.json({status: true, updatedUser}); 
    } catch(err){
        return res.json({msg: "error choosing language"});
    } 
}
module.exports.showquestions = async(req, res, next) => {
    const {language} = req.body;
    console.log(req.body)
    //console.log(temp);
    //console.log(EngtoHinQuestions);
    // const difficulty = temp.difficulty;
    
    let questions;
    if( language === "englishtohindi" ){ //i.e. if user has chosen to learn hindi from english
        // console.log(EngtoHinQuestions);
        console.log(EngtoHinQuestions)
        
        questions = EngtoHinQuestions;
        // questions = EngtoHinQuestions.filter((question) => question.difficulty === difficulty); //we are filtering questions from the required collection
        //console.log(questions);
    }
    else{ 
        return res.json({ status: "false"})
    }     
    return res.json({questions});
}
module.exports.submitAnswer = async (req,res,next) => {
    console.log(req.body);
    const {questionid, userid, Points} = req.body;
    let c_count = 0;
    let w_count = 0;
    if( Points > 0 ){
        c_count = 1;
    }    else{
        w_count = 1;
    }
     try{
            const updatedUser = await User.findByIdAndUpdate(
                userid,
                {
                    //$push: {correct_answers: questionid}, //push for adding in the current value here we are adding element in array
                    $inc: { 
                            totalPoints: Points,
                            correct_count: c_count,
                            wrong_count: w_count,
                        } ,//set for replacin the current value
                        //inc for incrementing the value
                }, 
                {new: true}
            )
    
        return res.json({status:"true"});
    } catch (error){
        console.log("error submiting answer", error)
    }
}
module.exports.setDifficulty = async(req, res, next)=> {
    
    console.log(req.body)
    const { username, currentDifficulty, _id} = req.body;
    const difficulty = currentDifficulty;
    console.log("current difficulty",difficulty);
    const userid = _id;
        const user = await User.findOne({username});//after finding the user in database
        if( !user )
            return res.json({msg: "user not found"});
    //console.log(user);
    try{
        const updatedUser = await User.findByIdAndUpdate( //updating using userid
            userid,
            {$set: {difficulty}},
            {new: true} //this is to return the updated values
        ) 
        return res.json({status: true, updatedUser}); 
    } catch(err){
        return res.json({msg: "error choosing difficulty"});
    } 

}


