import express, { json } from "express"
const app = express()
import mongoose from "mongoose"
// import UserModel from './models/Users.js'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import blogRoutes from './routes/blogs.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'
import tutorialRoutes from './routes/tutorials.js'
import adminRoutes from './routes/admin.js'
import conversationRoutes from './routes/conversations.js'
import notificationRoutes from './routes/notification.js'
import messageRoutes from './routes/messages.js'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import cors from 'cors'
dotenv.config()

const port = 3001
// app.use(cors())

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('Connected to Database');
    }).catch((err) => {
        throw err
    })
}

app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'https://fitness-app-client-pi.vercel.app');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/conversations', conversationRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/tutorials', tutorialRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notification', notificationRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'error'
    return res.status(status).json({
        success: false,
        status: status,
        message: message
    })
})

const server = app.listen(port, () => {
    connect()
    console.log("Connect to server!");
})

let users = []
const addUser = (userId, socketID) => {
    const alreadyExists = users.some(
        (user) => user.userId === userId || user.socketID === socketID
    );

    if (!alreadyExists) {
        users.push({ userId, socketID });
    }
}
const removeUser = (socketID) => {
    console.log('remove socketID', socketID);
    users = users.filter((user) => user.socketID !== socketID)
}
const getUser = (userId) => users.find(user => user.userId === userId)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        // origin: 'http://localhost:5173',
        // credentials: true
    }
})
io.on("connection", (socket) => {
    console.log('connect');
    io.emit('welcome', 'hello this is the fitness app of leon')
    // connect
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
        console.log("now users", users);
    })
    socket.on("removeUser", userId => {
        removeUser(userId, socket.id);
        io.emit("getUsers", users)
        console.log("now users", users);
    })
    // message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const receiver = getUser(receiverId)
        console.log('receiverId', receiverId);
        receiver && io.to(receiver.socketID).emit("getMessage", {
            senderId,
            text,
        })
    })

    // disconnect
    socket.on("disconnect", () => {
        console.log('user leave');
        removeUser(socket.id)
        io.emit("getUsers", users)
        console.log("getUsers", users)
    })
})
