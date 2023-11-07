import express from 'express'
import { ProductManager } from './ProductManager.js'
import { productsRouter } from './Routes/productsRouter.js';
import { CartManager } from './CartManager.js';
import { cartsRouter } from './Routes/cartRouter.js';

const PORT = 8080

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter )

app.listen(PORT, (req,res)=>{
    console.log('Escuchando PORT: 8080')
})