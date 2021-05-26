const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const redis = require("redis")
let RedisStore = require("connect-redis")(session)

const {
    MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("./config/config")

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

// Routes
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")

const app = express()

// Middlewares | Server Config
app.enable("trust proxy")
app.use(express.json())
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        name: 'cookieStore',
        secure: false,
        httponly: true,
        maxAge: 60000
    }
}))

// Database Connection | Remote network
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(`_________________________________________`)
            console.log(`Database connection successfull...`)
            console.log(`_________________________________________`)
        })
        .catch((err) => {
            console.log(`Error connecting to the database : ${err.message}`)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

// Routes 
// ______________________________
// URL: localhost:3000/api/v1
app.get("/api/v1", (req, res) => {
    res.json({
        "success": true,
        "message": "RESTful  API | Powered by: Express Server"
    })
})

// URL: localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter)

// URL: localhost:3000/api/v1/auth
app.use("/api/v1/auth", userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`_________________________________________`)
    console.log(`Backend services initiated...`)
    console.log(`Backend services served on port: ${PORT}`)
    console.log(`_________________________________________`)
})