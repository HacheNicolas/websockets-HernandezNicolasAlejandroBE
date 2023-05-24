import fs from "fs";

class ProductManager {
  #path;
  constructor(path) {
    this.products = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)) return fs.writeFileSync(this.#path, "[]");
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
  }
  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    return this.products;
  }
  getProductById(searchId) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    return this.products[searchId - 1];
  }
  #getProductByCode(searchCode) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.products.find((product) => product.code === searchCode)) {
      return false;
    } else {
      return true;
    }
  }
  addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    if (
      title === null ||
      title === undefined ||
      title === "" ||
      title === 0 ||
      title <= 0 ||
      description === null ||
      description === undefined ||
      description === "" ||
      description === 0 ||
      description <= 0 ||
      code === null ||
      code === undefined ||
      code === "" ||
      code === 0 ||
      code <= 0 ||
      price === null ||
      price === undefined ||
      price === "" ||
      price === 0 ||
      price <= 0 ||
      status === null ||
      status === undefined ||
      status === "" ||
      status === 0 ||
      status <= 0 ||
      stock === null ||
      stock === undefined ||
      stock === "" ||
      stock === 0 ||
      stock <= 0 ||
      category === null ||
      category === undefined ||
      category === "" ||
      category === 0 ||
      category <= 0 ||
      thumbnail === null ||
      thumbnail === undefined ||
      thumbnail === "" ||
      thumbnail === 0 ||
      thumbnail <= 0
    ) {
      throw new Error(
        "se deben completar todos los campos para crear un nuevo producto."
      );
    } else if (this.#getProductByCode(code)) {
      throw new Error("El campo code no debe repetirse.");
    } else {
      let id = this.products.length + 1;
      let newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };
      this.products = [...this.products, newProduct];
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return newProduct;
    }
  }
  updateProduct(searchId, product) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.products.find((product) => product.id === searchId)) {
      throw new Error("Not found: no existe un producto con el ID ingresado.");
    } else {
      const updatedProduct = this.products[searchId - 1];

      if (
        !product.title === null ||
        !product.title === undefined ||
        !product.title === "" ||
        !product.title === 0 ||
        !product.title <= 0
      ) {
        updatedProduct.title = product.title;
      }
      if (
        !product.description === null ||
        !product.description === undefined ||
        !product.description === "" ||
        !product.description === 0 ||
        !product.description <= 0
      ) {
        updatedProduct.description = product.description;
      }
      if (
        !product.code === null ||
        !product.code === undefined ||
        !product.code === "" ||
        !product.code === 0 ||
        !product.code <= 0
      ) {
        updatedProduct.code = product.code;
      }
      if (
        !product.price === null ||
        !product.price === undefined ||
        !product.price === "" ||
        !product.price === 0 ||
        !product.price <= 0
      ) {
        updatedProduct.price = Number(product.price);
      }
      if (
        !product.status === null ||
        !product.status === undefined ||
        !product.status === "" ||
        !product.status === 0 ||
        !product.status <= 0
      ) {
        updatedProduct.status = Boolean(product.status);
      }
      if (
        !product.stock === null ||
        !product.stock === undefined ||
        !product.stock === "" ||
        !product.stock === 0 ||
        !product.stock <= 0
      ) {
        updatedProduct.stock = Number(product.stock);
      }
      if (
        !product.category === null ||
        !product.category === undefined ||
        !product.category === "" ||
        !product.category === 0 ||
        !product.category <= 0
      ) {
        updatedProduct.category = product.category;
      }
      if (
        !product.thumbnail === null ||
        !product.thumbnail === undefined ||
        !product.thumbnail === "" ||
        !product.thumbnail === 0 ||
        !product.thumbnail <= 0
      ) {
        updatedProduct.thumbnail = product.thumbnail;
      }

      fs.writeFileSync(this.#path, JSON.stringify(this.products));

      return updatedProduct;
    }
  }
  deleteProduct(searchId) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.products.find((product) => product.id === searchId)) {
      throw new Error("Not found: no existe un producto con el ID ingresado.");
    } else {
      const erasedProduct = this.products[searchId - 1];
      this.products.splice(searchId - 1, 1);
      for (let i = 0; i < this.products.length; i++) {
        this.products[i].id = i + 1;
      }
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return erasedProduct;
    }
  }
}

export default ProductManager;
