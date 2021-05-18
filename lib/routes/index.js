// Load user routes
const usrRouter = require('../user/userRoute')
// const adminRouter = require('../admin')


//========================== Load Modules End ==============================================


module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendStatus(200);
    })
    app.use('/APE/v1/api/user', usrRouter);
    // app.use('/APE/v1/api/admin', adminRouter)
  
    
}  