const socket = io();

const optionsBox = document.getElementById("input");
const addProduct = document.getElementById("btnAddProduct");
const addNewProduct = document.getElementById("btnAddNewProduct");

socket.on("allProducts", (products) => {
  let options = "";
  products.forEach((product) => {
    options += `<option value="${product.id}">${product.id}</option>;`;
  });
  optionsBox.innerHTML = options;
});

addProduct.addEventListener("click", () => {
  socket.emit("addProduct", {
    productId: optionsBox.value,
  });
});

addNewProduct.addEventListener("click", () => {
  socket.emit("addNewProduct", {
    title: document.getElementById("inputTitle").value,
    description: document.getElementById("inputDescription").value,
    code: document.getElementById("inputCode").value,
    price: document.getElementById("inputPrice").value,
    status: document.getElementById("inputStatus").value,
    stock: document.getElementById("inputStock").value,
    category: document.getElementById("inputCategory").value,
    thumbnail: document.getElementById("inputThumbnail").value,
  });
});

socket.on("allSelectedProducts", (products) => {
  const divProducts = document.getElementById("divProducts");
  let content = "";
  products.forEach((product) => {
    content += `<div
    style="display:flex;
       max-height:300px;
  border: 1px solid white;
  border-radius: 10px;
  margin: 10px;
  background-color:rgb(46, 21, 0);"
  >
  
    <img
          src="${product.thumbnail}"
          style="display: block;
            background-size: cover;
            background-repeat:
            no-repeat;
            background-position:center;
            max-width: 300px;
            object-fit: cover;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-right: 1px solid white;"
          alt=""
        />
        <div
          style="display:flex;width: 450px; flex-direction: column; justify-content:space-evenly"
        >
          <p>id: ${product.id}</p>
          <p>title: ${product.title}</p>
          <p>description: ${product.descripton}</p>
          <p>code: ${product.code}</p>
          <p>price: ${product.price}</p>
          <p>status: ${product.status}</p>
          <p>stock: ${product.stock}</p>
          <p>category: ${product.category}</p>
        </div>
        </div>`;
  });
  divProducts.innerHTML = content;
});
