const mongoose = require('mongoose');


const hotelSchema = mongoose.Schema({
   title:{
       type: String,
       require: true,
       unique: true,
   },
   content:{
    type: String,
    require: true,
    maxlength: 5000 
   },
   location:{
    type: String,
    require: true, 
   },
   price:{
    type: Number,
    require: true, 
   },
   image:{
    data: Buffer,
    contentType: String, 
 
   },
   from:{
       type: Date

   },
   to:{
       type: Date
   },
   guests:{
       type: Number
   },
   seller:{
       type:String
   }

}, {timestamps: true}
);
hotelSchema.pre('save', async function (next) {
	const Hotel = this;
	console.log(Hotel);
	next();
});


const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;