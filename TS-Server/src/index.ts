import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './router/route'


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get('/' , (req:express.Request , res:express.Response)=>{
    res.send("its working")
})
app.use(router);

app.listen(PORT , ()=>{
    console.log("server started at " , PORT);
})


