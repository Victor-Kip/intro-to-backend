import express from 'express';

const app = express();
app.use(express.json())

//import routes
import router from './routes/user.route.js'

//declare routes
app.use("/api/v1/users",router)

export default app;