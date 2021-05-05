const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
app.use(cors());
// const bcrypt =require('bcryptjs')
const userRoutes = require('./server/routes/users');

app.use(express.json());
app.use('/api/users', userRoutes);

// app.get('/api', (req,res)=>{
//     const user = 'Natalie';
//     res.json(user);
// })

const port = 8000;

 //connect to db with mongoose
const connectionUrl= 'mongodb+srv://Nataliep:nataliep123@cluster0.hrjqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

 mongoose.connect(connectionUrl, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true
 }).then(() => {
     console.log("database connect")
 });

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  };
app.listen(process.env.PORT || port , () =>{
    console.log(`Server started on port ${port}`)
});

