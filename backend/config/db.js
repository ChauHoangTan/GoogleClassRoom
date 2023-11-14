const mongoose = require("mongoose");

 const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB Connected');
    } catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB