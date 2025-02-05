import mongoose from "mongoose";


export class ConnectMongo {
    private databaseUrl : string;
    constructor(){
        if(!process.env.MONGO_URI) {
            throw new Error("connection string not found !!");
        }
        this.databaseUrl = process.env.MONGO_URI;
    }
    connectDB() {
        mongoose
        .connect(this.databaseUrl)
        .then(()=> console.log("database connect aayi !!"))
        .catch((error)=> console.log(error));
    }
}