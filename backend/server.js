const express = require('express');
require('colors');
const fileUpload = require("express-fileupload");
const { connectToMongoDB } = require('./config/db');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const imageRoute = require('./routes/imageRoute');
const messageRoute = require('./routes/messageRoute');
const cors = require("cors");
const { app, server } = require('./config/socket');



const port = process.env.PORT;
app.use(fileUpload());
app.use(cors());


app.use(express.json());
// Middleware for handling file uploads

app.use(express.urlencoded({ extended: true }));
connectToMongoDB();



app.use('/user', userRoute);

app.use('/auth', authRoute)

app.use('/image', imageRoute)


app.use('/message', messageRoute)



app.get("/", (req, res) => {
    res.json({
        message: "Backend is running"
    })
})
server.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow);
});

