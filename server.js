const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
app.use(cors());
app.get('/api/getUser', (req,res)=>{
    const user = 'Natalie';
    res.json(user);
})


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
   //connect to db with mongoose
const connectionUrl ='mongodb+srv://Nataliep:nataliep123@cluster0.hrjqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`application start at port ${PORT}`)
})
