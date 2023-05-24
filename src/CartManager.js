import fs from "fs";

class CartManager {
  #path;
  constructor(path) {
    this.carts = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)) return fs.writeFileSync(this.#path, "[]");
    this.carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
  }
  addCart() {
    let id = this.carts.length + 1;
    let products = [];
    let newCart = {
      id,
      products,
    };
    this.carts = [...this.carts, newCart];
    fs.writeFileSync(this.#path, JSON.stringify(this.carts));
    return newCart;
  }
  addProduct(cartId, productId) {
    this.carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.carts.find((cart) => cart.id === cartId)) {
      throw new Error("Not found: no existe un carrito con el ID ingresado.");
    } else {
      if (
        !this.carts[cartId - 1].products.find((p) => p.product === productId)
      ) {
        let newProduct = { product: productId, quantity: 1 };
        this.carts[cartId - 1].products.push(newProduct);
      } else {
        this.carts[cartId - 1].products[productId - 1].quantity++;
      }
    }
    fs.writeFileSync(this.#path, JSON.stringify(this.carts));
    return this.carts[cartId - 1].products[productId - 1];
  }
  getProductsByCartId(cartId) {
    this.carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.carts.find((cart) => cart.id === cartId)) {
      throw new Error("Not found: no existe un carrito con el ID ingresado.");
    } else {
      return this.carts[cartId - 1].products;
    }
  }
}

export default CartManager;
