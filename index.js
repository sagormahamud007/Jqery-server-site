const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const app = express()
const port=process.env.PORT || 5000;
const cors=require('cors')
require('dotenv').config()


//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.uuzniqz.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('database connection')
  client.close();
});
  

app.get('/', (req, res) => {
  res.send('hello world, the room booking server site')
})

async function run(){

try{
const bookingCollection= client.db("bookingRoom").collection("bookingCollection") 
app.get('/bookingData',async(req,res)=>{
    const query={}
    const dataCollection=await bookingCollection.find(query).toArray();
    res.send(dataCollection)
})


app.get("/bookingData/:id",async (req,res)=>{
  const id=(req.params.id)
  console.log(id)
  const query={_id: ObjectId(id)}
  const singleCollection=await bookingCollection.findOne(query)
  res.send(singleCollection)
})

app.post("/bookingDataCollection",async(req,res)=>{
  const bookData=req.body;
  const result=await bookingCollection.insertOne(bookData)
  res.send(result)
})


}
finally{

}
  } run() .catch(err=>console.log(err))


  app.listen(port, (req,res)=>{
        console.log(`room booking the running port number${port}`)
  })