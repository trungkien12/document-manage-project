const siteRouter                = require('./site');
const employeesRouter           = require('./employeesManage');
const systemRouter              = require('./systemManage');
const docManageRouter           = require('./docManage');
const loginRouter               = require('./login');
const departmentRouter          = require('./departmentManage');
const adminRouter               = require('./admin');

function route(app){

    app.use('/dashboard',           adminRouter)
    app.use('/login',               loginRouter)
    app.use('/quan-ly-chung',       systemRouter);
    app.use('/nhan-vien',           employeesRouter)
    app.use('/tai-lieu',            docManageRouter);
    app.use('/phong-ban',           departmentRouter);
    app.use('/',                    siteRouter);

}

module.exports = route;