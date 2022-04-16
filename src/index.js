import {Server as soketServer} from "socket.io"
import http from "http"
import app from "./app"
import {PORT} from "./config"
import {connnectDB} from "./database"
import {socket} from './socket'

connnectDB()

const server = http.createServer(app)
const serverListening = server.listen(PORT)
console.log("listening on port", PORT)

const io = new soketServer(serverListening)

socket(io)