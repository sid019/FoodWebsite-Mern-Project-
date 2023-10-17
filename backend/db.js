const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://user : password@cluster0.jlsddk2.mongodb.net/goFoodMern?retryWrites=true&w=majority";
//enter user and password
async function connectToDatabase() {
    try{
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to database");
        
        const fetchData =  await mongoose.connection.db.collection("foodItems");
        global.foodItem = await fetchData.find({}).toArray();
           
        // console.log(global.foodItem);

        const foodCategory = await mongoose.connection.db.collection("foodcategory");   
        global.foodCategoryData = await foodCategory.find({}).toArray();
        // console.log(global.foodCategoryData);
    //here we store data in global variable we not need to write var/let/const before data we use global.data
        
    

    }
    catch(error){
        console.log(`error connecting to database ${error}`);
    }
}
module.exports = connectToDatabase;