"use client"

import React from "react";
import Link from "next/link";
import {
    Button,
    Toolbar,
    AppBar,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from './cart';
import {useCart} from "@/app/context/cart-context";

export default function Navbar() {
    const { cartItems, isCartOpen, toggleCart, cartCount } = useCart();

    return (
        <div>
            <AppBar position="static" className="h-14">
                <Toolbar className="flex justify-between items-center px-4">

                    <Link href="/" passHref>
                        <Typography variant="h6" className="text-white no-underline">
                            DigitalNest Store
                        </Typography>
                    </Link>
                    <Button
                        variant="text"
                        size="small"
                        aria-label="Open cart"
                        onClick={toggleCart}
                    >
                        <ShoppingCartIcon className="text-white" />
                    </Button>
                </Toolbar>

                <div
                    className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${
                        isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Close cart">
                            X
                        </Button>
                    </div>

                    <Cart />
                </div>


                {isCartOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleCart} aria-hidden="true" />}
            </AppBar>
        </div>
    );
}

