const products = document.querySelector("#products");
const cartItems = document.querySelector("#cart-items");
const total = document.querySelector("#total");

let totalAmount = 0;

products.addEventListener("dragstart", dragStart);
cartItems.addEventListener("dragover", dragOver);
cartItems.addEventListener("drop", dragDrop);

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.innerHTML);
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  const data = e.dataTransfer.getData("text");
  if (e.target.classList.contains("cart-item")) {
    totalAmount += parseFloat(data);
  } else if (e.target.id === "cart-items") {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = data;
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Delete";
    removeButton.addEventListener("click", removeItem);
    div.appendChild(removeButton);
    e.target.appendChild(div);
    totalAmount += parseFloat(data);
  }
  total.innerHTML = `Total Amount: ${totalAmount}`;
}

function removeItem(e) {
  const item = e.target.parentElement;
  const price = parseFloat(item.innerHTML);
  totalAmount -= price;
  total.innerHTML = `Total Amount: ${totalAmount}`;
  item.remove();
}