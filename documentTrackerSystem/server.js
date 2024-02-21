const express = require('express');
const CORS = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;


const authRouter =  require('./router/authRouter');
const userRouter = require('./router/userRouter');
const deptRouter = require('./router/deptRouter');
const staffRouter = require('./router/staffRouter');
const roleRouter = require('./router/rolesRouter');

//middleWares
app.use(CORS());
app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', deptRouter);
app.use('/', staffRouter);
app.use('/', roleRouter)



app.listen(PORT, () => {
     console.log(`listening on Port ${PORT}`)
});