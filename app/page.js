"use client"

import Image from "next/image";
import axios from "axios";
import React, {useState, useEffect} from "react";
import {
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material"
import ProductCards from "@/app/components/product-cards";

export default function Home() {
  const [data, setData] =  useState([]);
  const [categories, setCategories] = useState('All Categories');

  useEffect(() => {
    axios.get("https://cart-api.alexrodriguez.workers.dev/products")
    .then((response) => {
        setData(response.data);
    })
        .catch((error) => {
            console.log(error);
        })
  }, []);

  const filteredProducts = categories === 'All Categories' ? data : data.filter((product) => product.category === categories);

  return (
    <div className="pt-24 pl-16">
        <div className="flex pr-16">
            <Typography variant="h5" className="text-black md:pr-[70rem]">
                Our Products
            </Typography>

            <FormControl className="w-56 h-auto">
                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                <Select
                    variant="outlined"
                    value={categories}
                    label="Categories"
                    onChange={(e) => setCategories(e.target.value)}
                >
                    <MenuItem value={"All Categories"}>All Categories</MenuItem>
                    <MenuItem value={"Apparel"}>Apparel</MenuItem>
                    <MenuItem value={"Accessories"}>Accessories</MenuItem>
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                </Select>
            </FormControl>
        </div>
        <ProductCards products={filteredProducts}/>
    </div>
  );
}
