const express = require("express");
const connectDb = require("./config/dbconnection");
const errorHandler = require("./middleware/errorHandler");
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { sessionMid } = require("./authentication");
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 5001;
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMid);
app.use(express.json());
// Routes
app.use("/api/employees", require("./routes/employeeroute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/", require("./routes/viewRoute"));
// Error handling middleware
app.use(errorHandler);
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Static files
app.use("/javascript", express.static(path.resolve(__dirname, "public/javascript")));
app.use("/css", express.static(path.resolve(__dirname, "public/css")));
app.use("/image", express.static(path.resolve(__dirname, "public/image")));
app.use("/uploads",express.static(path.resolve(__dirname,"public/uploads")));
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

   