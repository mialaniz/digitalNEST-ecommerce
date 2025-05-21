"use client";

import { Button } from "@mui/material";
import { useCart } from "@/app/context/cart-context";

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart();

    return (
        <Button color="primary" variant="contained" onClick={() => addToCart(product)}>
            Add to Cart
        </Button>
    );
}