const mongoose = require("mongoose");

const connection = async() => {

    try {
        const url = "mongodb://localhost:27017/news"
        
        await mongoose.connect(url);

        console.log("Connected successfully on " + url);
        
    } catch (error) {
        console.log(error);
        throw new Error("Connection failed");
        
    }
}

module.exports = {
    connection
}