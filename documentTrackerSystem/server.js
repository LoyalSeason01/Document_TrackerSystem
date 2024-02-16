const express = require('express');
const CORS = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;


const authRouter =  require('./router/authRouter');
const userRouter = require('./router/userRouter');

//middleWares
app.use(CORS());
app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter);
app.use('/', userRouter);



app.listen(PORT, () => {
     console.log(`listening on Port ${PORT}`)
});