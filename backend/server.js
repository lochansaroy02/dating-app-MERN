const express = require('express');
const fileUpload = require("express-fileupload");
const { connectToMongoDB } = require('./config/db');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const imageRoute = require('./routes/imageRoute');
const cors = require("cors");


const app = express();
const port = 3000;
app.use(cors());


app.use(express.json());
// Middleware for handling file uploads
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use(express.urlencoded({ extended: true }));
connectToMongoDB();

app.use('/user', userRoute);

app.use('/auth', authRoute)

app.use('/image', imageRoute)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});