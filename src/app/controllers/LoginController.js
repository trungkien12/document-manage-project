const jwt       = require('jsonwebtoken');
const Employee   = require('../models/Employee'); 
const { mutipleMongooseToObject } = require('../../utils/mongoose');

class SiteController {

  index(req,res) {
    res.render('login', {layout: ''});
  }

    //GENNERATE ACCESS TOKEN
  gennerateAccessToken(req, res, next) {
      Employee.findOne({Username: req.body.txtUsername})
      jwt.sign({
        id: user._id
      },
      "secretkey",
      {expiresIn: '1d'}
      );
    }
    //GENNERATE REFRESH TOKEN 
  gennerateRefreshToken(req, res, next) {
      Employee.findOne({Username: req.body.txtUsername})
      jwt.sign({
        id: user._id
      },
      "secretkey",
      {expiresIn: '365d'}
      );
    }

  processLogin(req, res, next){

    Employee.findOne({Username: req.body.txtUsername})
    .then( user => {
      if(!user) {
        res.json('nhập sai username ròi!');
      }if(user.Password !== req.body.txtPassword)
      {
        res.json('Nhập sai pass ròi!');
      }else{
        const accessToken = jwt.sign({
          id: user._id
        },
        "secretkey",
        {expiresIn: '1d'}
        );; 
        const refreshToken = jwt.sign({
          id: user._id
        },
        "secretkey",
        {expiresIn: '365d'}
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        })
        res.render('dashboard', {
          layout:'admin',
          user: user
        } )
      }
    }
    )
    .catch(next)

  }
}



module.exports = new SiteController;


