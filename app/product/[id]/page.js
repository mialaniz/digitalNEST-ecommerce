// app/product/[id]/page.js
import Image from "next/image";
import axios from "axios";
import { notFound } from "next/navigation";
import { Typography, Button, Paper, Box } from "@mui/material";
import AddToCartButton from "@/app/components/addtocart";


//Added this in order to deploy successfully onto GitHub pages.
export async function generateStaticParams() {
    const res = await axios.get("https://cart-api.alexrodriguez.workers.dev/products");
    const products = res.data;

    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductDetail({ params }) {
    const { id } = params;

    let product;
    try {
        const res = await axios.get(`https://cart-api.alexrodriguez.workers.dev/products/${id}`);
        product = res.data;
    } catch (err) {
        console.error(err);
        notFound();
    }

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
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}
