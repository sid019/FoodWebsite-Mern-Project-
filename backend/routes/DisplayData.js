const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res) => {
    try {
        // console.log(global.foodItem, global.foodCategoryData);
        res.send([global.foodItem, global.foodCategoryData]);
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})

module.exports = router;