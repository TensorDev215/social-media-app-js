import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';

const app = express();
dotenv.config();

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {console.log("connected to Mongo")})
// .catch((err) => { console.log(err) })
mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log("connected to Mongo")})
.catch((err) => { console.log(err) })


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}))

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running on port " + port) 
})
