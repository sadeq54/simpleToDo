import  express from 'express';
import  cors from 'cors';
import  pool from "./db.js"
const app = express();

// medlleware
app.use(cors());
// app.use(cors()); to allow cross-origin requests 
app.use(express.json());
// to access the body of the request

// ROUTS

// create to do
app.post("/todo", async(req, res)=>{
    try {
        const {description} = req.body
          
       // console.log(req.body)

      const result =  await pool.query("Insert into todo (descreption) VALUES($1) RETURNING *", [description]);
        console.log(result.rows[0])

       res.json(result.rows[0])

    } catch (error) {
        console.log(error)
    }
})

app.get("/todo", async (req, res)=>{
    try {
        
        const data = await pool.query("select descreption from todo ");
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error)        
    }
})



app.listen(3000, () => {
    console.log('Server is running on port 300 at http://localhost:3000');
});