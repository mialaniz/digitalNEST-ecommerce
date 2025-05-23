import React from 'react';
import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function ProductCards({products}) {
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {products.map((product) => (

                    <Grid size={2} key={product.id}
                          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.15)'}
                          onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}>
                        <Link
                            href={`/product/${product.id}`}
                        >
                            <Paper className="rounded-lg hover:shadow-lg md:h-[17.5rem]">
                                <div className="flex justify-center items-center pt-1">
                                    <Image
                                        src={product.image}
                                        width={280}
                                        height={10}
                                        alt="Picture"
                                    />
                                </div>
                                <Typography className="pt-2 pl-2 font-bold">{product.name}</Typography>
                                <Typography className="pl-2 text-cyan-300 font-bold">${product.price.toFixed(2)}</Typography>
                            </Paper>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

