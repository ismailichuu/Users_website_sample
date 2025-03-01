
import mongoose from "mongoose";
const mongoString = process.env.MONGOSTRING;


const mongoConnect = () => {
    mongoose.connect(mongoString)
    .then(()=>{
        console.log('Database Connected Successfully');
    })
    .catch(err => console.log('Database error',err));
}


export default mongoConnect;
