const jwt = require('jsonwebtoken');

const middlewereController = {
    //verifi token
    verifiToken: (req,res,next) => {
        const token = req.cookies.refreshToken;
        if(token) {
            // const accessToken = token.split(" ")[1];
            jwt.verify(token, "secretkey", (err, user) => {
                if(err) {
                    res.status(404).json('token đã hết hạn')
                }
                req.user = user;
                next();
            });
        }   
        else{
            res.redirect('/login');
        }
            // const token = req.cookies.token;
            // const ketqua= jwt.verify(token, 'secretkey')
            // if(ketqua){
            //     next()
            // }else{
            // res.redirect('/login')
            // }
     }
}

module.exports = middlewereController;