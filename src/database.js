import {connect} from "mongoose"
import {MONGO_URI} from "./config"

export const connnectDB = async () => {
    try {
       await connect(MONGO_URI)
        console.log("connected to DB")
    } catch (error) {
        console.log(error, "connection to DB failed")
    }
}
