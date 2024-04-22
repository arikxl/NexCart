import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        brand: {type: String, required: true},
        rating: {type: Number, required: true, default:0},
        numOfReviews: {type: Number, required: true, default:0},
        countInStock: {type: Number, required: true, default:0},
        desc: {type: String, required: true},
        isFeatured: { type: Boolean, default: false },
        banner: String,
    },
    {
        timestamps: true,
    }
)

const ProductModel = 
    mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel;

export type Product = {
    _id?: string;
    name: string;
    slug: string;
    image: string;
    banner?: string;
    brand: string;
    price: number;
    desc: string;
    category: string;
    rating: number;
    numOfReviews: number;
    countInStock: number;
    isFeatured?: boolean;
    colors?: [];
    sizes?: [];
}