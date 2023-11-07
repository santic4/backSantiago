import { Router } from 'express';
import { productManager } from '../index.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitProducts = products.slice(0, limit);
      res.json(limitProducts);
    } else {
      res.json(products);
    }
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const newProduct = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.json(newProduct);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

productsRouter.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const updatedProduct = await productManager.updateProduct(pid, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(pid);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message,
    });
  }
});

export { productsRouter };
