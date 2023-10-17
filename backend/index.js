const express = require('express');
const app = express();
const port = 5000;

//connected to database
const MongoDB = require("./db.js");
MongoDB();

//middleware
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
})
app.use(express.json());
app.use('/api', require("./routes/CreateUser.js"));
app.use('/api', require("./routes/DisplayData.js"));
app.use('/api', require("./routes/OrderData.js"));

app.get('/', (req,res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});