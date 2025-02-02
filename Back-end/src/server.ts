import { App } from "./app.js";
import { ConnectMongo } from "./config/connectMongo.js";

const app = new App();
const database = new ConnectMongo();
database.connectDB();

app
.getApp()
.listen(3006,()=> {
    console.log("server running aanu 3006 il")
})