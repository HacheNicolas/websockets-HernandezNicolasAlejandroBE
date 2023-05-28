import express from "express";
import handlebars from "express-handlebars";
import { routerProducts } from "./routes/products.routes.js";
import { routerCarts } from "./routes/carts.routes.js";
import { routerViewProducts } from "./routes/products.view.routes.js";
import { routerViewRealTimeProducts } from "./routes/realTimeProducts.view.routes.js";
import { productManager } from "./routes/products.routes.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.use("/", routerViewProducts);
app.use("/realTimeProducts", routerViewRealTimeProducts);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Error, esta ruta no existe.",
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}. Link: http://localhost:8080/`
  );
});

const socketServer = new Server(httpServer);
let products = [];
let allProducts = productManager.getProducts();
socketServer.on("connection", (socket) => {
  console.log("cliente conectado");
  socketServer.emit("allProducts", allProducts);
  socketServer.emit("allSelectedProducts", products);
  socket.on("addProduct", (id) => {
    const product = productManager.getProductById(id.productId);
    products.push(product);
    socketServer.emit("allProducts", allProducts);
    socketServer.emit("allSelectedProducts", products);
  });
  socket.on("addNewProduct", (prod) => {
    console.log(
      "ampooos" + prod.title,
      prod.description,
      prod.code,
      prod.price,
      prod.status,
      prod.stock,
      prod.category,
      prod.thumbnail
    );
    const product = productManager.addProduct(
      prod.title,
      prod.description,
      prod.code,
      prod.price,
      prod.status,
      prod.stock,
      prod.category,
      prod.thumbnail
    );
    products.push(product);
    allProducts.push(product);
    socketServer.emit("allProducts", allProducts);
    socketServer.emit("allSelectedProducts", products);
  });
});
