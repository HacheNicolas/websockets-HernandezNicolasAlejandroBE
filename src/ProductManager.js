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
    // if (this.products.length === 0) {
    //   console.log(this.products);
    // } else {
    //   this.products.forEach((product) => {
    //     const { id, title, description, price, thumbnail, code, stock } =
    //       product;
    //     console.log(
    //       `{- "id": ${id} \n - "title": ${title} \n - "description": ${description} \n - "price": ${price} \n - "thumbnail": ${thumbnail} \n - "code": ${code} \n - "stock": ${stock}} \n`
    //     );
    //   });
    // }
    return this.products;
  }
  getProductById(searchId) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    // if (!this.products.find((product) => product.id === searchId)) {
    //   console.log("Not found: no existe un producto con el ID ingresado.");
    // } else {
    //   const { id, title, description, price, thumbnail, code, stock } =
    //     this.products[searchId - 1];
    //   console.log(
    //     `{- "id": ${id} \n - "title": ${title} \n - "description": ${description} \n - "price": ${price} \n - "thumbnail": ${thumbnail} \n - "code": ${code} \n - "stock": ${stock}} \n`
    //   );

    //   return this.products[searchId - 1];
    // }
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
  addProduct(title, description, price, thumbnail, code, stock) {
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
      price === null ||
      price === undefined ||
      price === "" ||
      price === 0 ||
      price <= 0 ||
      thumbnail === null ||
      thumbnail === undefined ||
      thumbnail === "" ||
      thumbnail === 0 ||
      thumbnail <= 0 ||
      code === null ||
      code === undefined ||
      code === "" ||
      code === 0 ||
      code <= 0 ||
      stock === null ||
      stock === undefined ||
      stock === "" ||
      stock === 0 ||
      stock <= 0
    ) {
      console.log(
        "Error. Se deben completar todos los campos para crear un nuevo producto."
      );
    } else if (this.#getProductByCode(code)) {
      console.log(`El campo "code" no debe repetirse.`);
    } else {
      let id = this.products.length + 1;
      let newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products = [...this.products, newProduct];
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
    }
  }
  updateProduct(searchId, product) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.products.find((product) => product.id === searchId)) {
      console.log("Not found: no existe un producto con el ID ingresado.");
    } else {
      const updatedProduct = this.products[searchId - 1];
      updatedProduct.title = product.title;
      updatedProduct.description = product.description;
      updatedProduct.price = product.price;
      updatedProduct.thumbnail = product.thumbnail;
      updatedProduct.code = product.code;
      updatedProduct.stock = product.stock;

      fs.writeFileSync(this.#path, JSON.stringify(this.products));

      const { id, title, description, price, thumbnail, code, stock } =
        updatedProduct;

      return console.log(
        `Producto actualizado correctamente:\n{- "id": ${id} \n - "title": ${title} \n - "description": ${description} \n - "price": ${price} \n - "thumbnail": ${thumbnail} \n - "code": ${code} \n - "stock": ${stock}} \n}`
      );
    }
  }
  deleteProduct(searchId) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.products.find((product) => product.id === searchId)) {
      console.log("Not found: no existe un producto con el ID ingresado.");
    } else {
      this.products.splice(this.products[searchId - 1], 1);
      for (let i = 0; i < this.products.length; i++) {
        this.products[i].id = i + 1;
      }
      fs.writeFileSync(this.#path, JSON.stringify(this.products));
      return console.log("Producto eliminado correctamente.");
    }
  }
}

export default ProductManager;
