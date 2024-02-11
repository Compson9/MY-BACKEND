import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "please Enter Product Name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: false,
        }
    }, 
    {
        Timestamps:true
    }
)

const Product = mongoose.model("Product",productSchema)

export default Product