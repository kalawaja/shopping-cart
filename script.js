const products = document.querySelector("#products");
const cartItems = document.querySelector("#cart-items");
const total = document.querySelector("#total");

let totalAmount = 0;

products.addEventListener("dragstart", dragStart);
cartItems.addEventListener("dragstart", dragStart);
cartItems.addEventListener("dragend", dragEnd);
cartItems.addEventListener("dragover", dragOver);
cartItems.addEventListener("dragenter", dragEnter);
cartItems.addEventListener("dragleave", dragLeave);
cartItems.addEventListener("drop", dragDrop);

function dragStart(e) {
  e.dataTransfer.setData("text", e.target.innerHTML);
}

function dragEnd(e) {
  const items = document.querySelectorAll(".cart-item");
  items.forEach((item) => item.classList.remove("dragging"));
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("dragging");
}

function dragLeave(e) {
  e.target.classList.remove("dragging");
}

function dragDrop(e) {
  const data = e.dataTransfer.getData("text");
  if (e.target.classList.contains("cart-item")) {
    totalAmount += parseFloat(data.split(" ")[1]);
  } else if (e.target.id === "cart-items") {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = data;
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Sepetten Çıkar";
    removeButton.addEventListener("click", removeItem);
    div.appendChild(removeButton);
    e.target.appendChild(div);
    totalAmount += parseFloat(data.split(" ")[1]);
  }
  total.innerHTML = `Toplam Tutar: ${totalAmount}`;
}

function removeItem(e) {
  const item = e.target.parentElement;
  const price = parseFloat(item.innerHTML.split(" ")[1]);
  totalAmount -= price;
  total.innerHTML = `Toplam Tutar: ${totalAmount}`;
  item.remove();
}