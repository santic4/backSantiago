import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
  constructor() {
    this.path = 'src/cart.json';
    this.carts = [];
  }

  getCarts = async () => {
    const res = await fs.readFile(this.path, 'utf8');
    const resJSON = JSON.parse(res);
    return resJSON;
  }

  getCartProducts = async (id) => {
    const carts = await this.getCarts();
    const cart = carts.find(e => e.id === id);

    if (cart) {
      return cart.products;
    } else {
      console.log('Carrito no encontrado');
    }
  }

  newCart = async () => {
    const id = uuidv4();

    const newCart = { id, products: [] };

    this.carts = await this.getCarts();

    this.carts.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(this.carts));

    return newCart;
  }

  addProductToCart = async (cartId, productId) => {
    const res = await this.getCarts();
    const index = res.findIndex(e => e.id === cartId);

    if (index !== -1) {
      const cartProducts = await this.getCartProducts(cartId);
      const index2 = cartProducts.findIndex(e => e.productId === productId);

      if (index2 !== -1) {
        cartProducts[index2].quantity = cartProducts[index2].quantity + 1;
      } else {
        cartProducts.push({ productId, quantity: 1 });
      }
      res[index].products = cartProducts;

      await fs.writeFile(this.path, JSON.stringify(res));

      console.log('Producto agregado');
    } else {
      console.log('Error al agregar producto');
    }
  }
}
