// pages/products/[id].js

import Image from "next/image";
import axios from "axios";
import { useCart } from "@/app/context/cart-context";
import {
    Typography,
    Button,
    Paper,
    Box,
} from "@mui/material";

export async function getStaticPaths() {
    const res = await axios.get("https://cart-api.alexrodriguez.workers.dev/products");
    const products = res.data;

    const paths = products.map(product => ({
        params: { id: product.id.toString() },
    }));

    return { paths, fallback: false }; // fallback: false = 404 for unknown IDs
}

export async function getStaticProps({ params }) {
    const res = await axios.get(`https://cart-api.alexrodriguez.workers.dev/products/${params.id}`);
    return {
        props: {
            product: res.data,
        },
    };
}

export default function ProductDetail({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="pt-24 px-4 flex justify-center">
            <Paper elevation={2} className="p-4 w-full max-w-6/12 h-72">
                <div className="flex flex-col md:flex-row gap-4">
                    <Image
                        src={product.image}
                        width={250}
                        height={250}
                        alt={product.name}
                        className="object-contain"
                    />
                    <div>
                        <Typography variant="h6" className="font-bold">{product.name}</Typography>
                        <Typography variant="body2" className="text-gray-600 pt-1 line-clamp-2">
                            {product.description || "No description provided."}
                        </Typography>
                        <Typography variant="subtitle1" className="pt-2 text-cyan-500 font-bold">
                            ${product.price.toFixed(2)}
                        </Typography>
                        <div className="pt-12">
                            <Button color="primary" variant="contained" onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
