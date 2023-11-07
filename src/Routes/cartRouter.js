import { Router } from 'express';
import { cartManager } from '../index.js';

const cartsRouter = Router();

// Crear nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.newCart();
    res.json(newCart);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

// Obtener productos de un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartProducts = await cartManager.getCartProducts(cid);
    res.json(cartProducts);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

// Agregar un producto a un carrito
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    res.send('Producto Agregado');
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

export { cartsRouter };
