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
    colors?: [];
    sizes?: [];
}