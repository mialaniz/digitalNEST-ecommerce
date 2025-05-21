"use client"
import {useState, useEffect} from "react";
import {
    Button,
    Divider,
    Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useCart} from "@/app/context/cart-context";

export default function Cart(){

    const {cartItems, updateQuantity, removeFromCart} = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return(
        <div className="text-black flex h-[calc(100vh-10rem)] flex-col">
            <div>
                <Typography variant="h5" className="pb-4">Your Cart</Typography>
                <Divider orientation="horizontal"/>

                {cartItems.map((item) => (
                    <div key={item.id} className="mb-6 pt-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.name} from cart`}
                            >
                                <DeleteOutlineIcon/>
                            </Button>
                        </div>

                        <div className="mt-2 flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                            >
                                -
                            </Button>
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                            >
                                +
                            </Button>
                        </div>
                        <Divider orientation="horizontal" className="pb-4"/>
                    </div>

                ))}

                <div className="space-y-1.5">
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}