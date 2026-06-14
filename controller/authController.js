//sign up/login/reset pwd

const signup = (req, res, next) => { 
    res.json({
        status: 'success',
        message: 'signup route working'
    });
}   
//export module

module.exports = {signup};