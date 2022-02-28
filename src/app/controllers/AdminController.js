class AdminController {

    index(req,res) {
        res.render('dashboard', {layout: 'admin'});
    }
}



module.exports = new AdminController;
