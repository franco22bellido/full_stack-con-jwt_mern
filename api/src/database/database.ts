import mongoose from "mongoose";
import config from "../config";


const uri: string = `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`

export default mongoose.connect(uri)
.then((connection)=>{
console.log("db conenctada");
})
.catch((err)=>{
    console.log(err);
});



