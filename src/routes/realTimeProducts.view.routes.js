import express from "express";
import { productManager } from "./products.routes.js";

export const routerViewRealTimeProducts = express.Router();

routerViewRealTimeProducts.get("/", async (req, res) => {
  return res.render("realTimeProducts", {
    viewTitle: "Real Time Products",
  });
});
