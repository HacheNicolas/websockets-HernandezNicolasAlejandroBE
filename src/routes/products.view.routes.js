import express from "express";
import { productManager } from "./products.routes.js";

export const routerViewProducts = express.Router();

routerViewProducts.get("/", async (req, res) => {
  return res.render("home", {
    viewTitle: "Products",
    products: await productManager.getProducts(),
  });
});
