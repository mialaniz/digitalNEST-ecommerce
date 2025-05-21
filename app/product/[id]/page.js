

import {use, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useCart } from "@/app/context/cart-context";
import {
    Typography,
    Button,
    Paper,
    Box,
    CircularProgress,
} from "@mui/material";


export async function generateStaticParams() {
    const res = await fetch("https://cart-api.alexrodriguez.workers.dev/products");
    const products = await res.json();

    return products.map((product) => ({
        id: product.id.toString(), // dynamic segment values must be strings
    }));
}

export default function ProductDetail({params}) {

    const { id } = use(params);
    const {addToCart} = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        axios.get(`https://cart-api.alexrodriguez.workers.dev/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Box className="flex justify-center items-center h-screen">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="pt-24 px-4 flex justify-center">
            <Paper elevation={2} className="p-4 w-full max-w-6/12 h-72"> {/* Set max width here */}
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