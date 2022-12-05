var product_total_amt = document.getElementById("product_total_amt");
var shipping_charge = document.getElementById("shipping_charge");
var total_cart_amt = document.getElementById("total_cart_amt");
var discountCode = document.getElementById("discount_code1");
const itemsBox = document.querySelector(".box-container");
const cartData = document.querySelector(".cart_items");
const showDataonCheck = document.querySelector(".showItemsOnCheckout");
const checkoutBtn = document.querySelector(".add_to_cart");
const cartItemsValue = document.querySelector(".cartitemsValue");
const cartTotalDiv = document.querySelector(".cartpricediv");
const firstName = document.querySelector(".first_name");
const secondName = document.querySelector(".second_name");
const phoneNumber = document.querySelector(".phone_number");
const pinCode = document.querySelector(".pin_code");
const inputState = document.querySelector(".inp_state");
const inputCity = document.querySelector(".inp_city");
const inputAddressHouse = document.querySelector(".house_no");
const inputAddressColony = document.querySelector(".inp_address");
const inputEmail = document.querySelector(".email_inp");

const decreaseNumber = (incdec, itemprice) => {
  var itemval = document.getElementById(incdec);
  var itemprice = document.getElementById(itemprice);
  if (itemval.value <= 0) {
    itemval.value = 0;
    alert("Negative quantity not allowed");
  } else {
    itemval.value = parseInt(itemval.value) - 1;
    itemval.style.background = "#fff";
    itemval.style.color = "#000";
    itemprice.innerHTML = parseInt(itemprice.innerHTML) - 15;
    product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) - 15;
    total_cart_amt.innerHTML =
      parseInt(product_total_amt.innerHTML) +
      parseInt(shipping_charge.innerHTML);
  }
};
const increaseNumber = (incdec, itemprice) => {
  var itemval = document.getElementById(incdec);
  var itemprice = document.getElementById(itemprice);
  if (itemval.value >= 5) {
    itemval.value = 5;
    alert("max 5 allowed");
    itemval.style.background = "red";
    itemval.style.color = "#fff";
  } else {
    itemval.value = parseInt(itemval.value) + 1;
    itemprice.innerHTML = parseInt(itemprice.innerHTML) + 15;
    product_total_amt.innerHTML = parseInt(product_total_amt.innerHTML) + 15;
    total_cart_amt.innerHTML =
      parseInt(product_total_amt.innerHTML) +
      parseInt(shipping_charge.innerHTML);
  }
};
const discount_code = () => {
  let totalamtcurr = parseInt(total_cart_amt.innerHTML);
  let error_trw = document.getElementById("error_trw");
  if (discountCode.value === "thapa") {
    let newtotalamt = totalamtcurr - 15;
    total_cart_amt.innerHTML = newtotalamt;
    error_trw.innerHTML = "Hurray! code is valid";
  } else {
    error_trw.innerHTML = "Try Again! Valid code is thapa";
  }
};

let items = [];
fetch("http://localhost:4000/api/items")
  .then(function (data) {
    return data.json();
  })
  .then(function (compltData) {
    items = [...compltData];
    for (let a = 0; a < compltData.length; a++) {
      itemsBox.innerHTML += `<div class="box" data-aos="${compltData[a].position}">
         <img src="./images/${compltData[a].thumbnail}" alt="" />
         <h3>${compltData[a].itemName}</h3>
         <div class="stars">
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
         </div>
         <div class="price_1">₹ ${compltData[a].rate}</div>
         <a href="#"><button onclick="addToCart('${compltData[a].itemName}')" class="btn cart-btns">add to cart</button></a>
       </div> `;
    }
  });

function addToCart(item) {
  const data = items.find((itemss) => itemss.itemName === item);
  var arrayItem = [];
  if (localStorage.getItem("cartItem") === null) {
    arrayItem = [];
  } else {
    arrayItem = JSON.parse(localStorage.getItem("cartItem"));
  }
  arrayItem.push(data);
  localStorage.setItem("cartItem", JSON.stringify(arrayItem));
  upDateCart();
}

function upDateCart() {
  const token = localStorage.getItem("cartItem");
  const itemArray = JSON.parse(token);
  if (itemArray === null) {
    checkoutBtn.style.display = "none";
    cartData.innerHTML = `<h1>Cart is empty</h1>`;
  } else if (itemArray.length >= 1) {
    checkoutBtn.style.display = "block";
    cartData.innerHTML = itemArray.map(
      (eachItem) => `<div class="cart-item">
                <span onclick="filterCart('${eachItem.id}')"class="fas fa-times" id="del_cart-item"></span>
                <img src="images/${eachItem.thumbnail}" alt="" />
                <div class="content">
                  <h3>${eachItem.itemName}</h3>
                  <div class="cart_price-1">${eachItem.rate}</div>
                </div>
              </div>`
    );
  }
}
upDateCart();

function filterCart(id) {
  const localStore = localStorage.getItem("cartItem");
  let itemArray = JSON.parse(localStore);
  const newLocalStorage = itemArray.filter((item) => item.id != id);
  if (itemArray.length > 1) {
    localStorage.setItem("cartItem", JSON.stringify(newLocalStorage));
  } else {
    localStorage.clear("cartItem");
  }
  upDateCart();
}

function showProductsforCheckout() {
  const localStore = localStorage.getItem("cartItem");
  let itemArray = JSON.parse(localStore);
  if (itemArray == null || itemArray.length < 1) {
    showDataonCheck.innerHTML = `<h1>You dont have anything </h1>`;
  } else {
    cartItemsValue.innerText = `Total Items: ${itemArray.length} in your Cart!`;
    showDataonCheck.innerHTML = itemArray.map(
      (eachItem) => `<div class="card p-4">
    <div class="row">
      <!-- cart images div -->
      <div
        class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img"
      >
        <img
          src="./images/${eachItem.thumbnail}"
          class="img-fluid"
          alt="cart img"
        />
      </div>
      <div class="col-md-7 col-11 mx-auto px-4 mt-2">
        <div class="row">
          <!-- product name  -->
          <div class="col-6 card-title">
            <h1 class="mb-4 product_name">${eachItem.itemName}</h1>
            <p class="mb-2">SHIRT - BLUE</p>
            <p class="mb-2">COLOR: BLUE</p>
            <p class="mb-3">SIZE: M</p>
          </div>
          <!-- quantity inc dec -->
          <div class="col-6">
            <ul
              class="pagination justify-content-end set_quantity"
            >
              <li class="page-item">
                <button
                  class="page-link"
                  onclick="decreaseNumber('textbox','itemval')"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </li>
              <li class="page-item">
                <input
                  type="text"
                  name=""
                  class="page-link"
                  value="0"
                  id="textbox"
                />
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  onclick="increaseNumber('textbox','itemval')"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div
            class="col-8 d-flex justify-content-between remove_wish"
          >
            <p><i class="fas fa-trash-alt"></i> REMOVE ITEM</p>
            <p><i class="fas fa-heart"></i>MOVE TO WISH LIST</p>
          </div>
          <div
            class="col-4 d-flex justify-content-end price_money"
          >
            <h3><span id="itemval">₹${eachItem.rate}</span></h3>
          </div>
        </div>
      </div>
    </div>
  </div>`
    );
    const totalPrice = itemArray.reduce(
      (a, b) => Number(a) + Number(b["rate"]),
      0
    );
    cartTotalDiv.innerHTML = `<div class="price_indiv d-flex justify-content-between">
    <p>Product amount</p>
    <p>₹<span id="product_total_amt">${totalPrice}</span></p>
  </div>
  <div class="price_indiv d-flex justify-content-between">
    <p>Shipping Charge</p>
    <p>₹<span id="shipping_charge">40.0</span></p>
  </div>
  <hr />
  <div
    class="total-amt d-flex justify-content-between font-weight-bold"
  >
    <p>The total amount of (including VAT)</p>
    <p>₹<span id="total_cart_amt">${totalPrice + 40}</span></p>
  </div>
  <button class="btn btn-primary text-uppercase" id="open__modal">
    Checkout
  </button>`;
  }
  checkoutBtn;
}
showProductsforCheckout();

const modal = document.querySelector(".modal_container");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnToOpenModal = document.querySelector("#open__modal");

btnToOpenModal.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("btn clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

const paymetPage = document.querySelector("#payment_page");
const payemtModule = document.querySelector(".payment_container");

paymetPage.addEventListener("click", function (e) {
  e.preventDefault();
  payemtModule.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", function (e) {
  e.preventDefault();
  payemtModule.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function (e) {
  e.preventDefault();
  payemtModule.classList.add("hidden");
  overlay.classList.add("hidden");
});


const cartItem_item = document.querySelector(".cart-items-container");
const cartButton_item = document.querySelector("#cart-btn");
// const body = document.querySelector("body");


cartButton_item.addEventListener("click", function () {
  cartItem_item.classList.toggle("active");
});

window.onscroll = () => {
  cartItem_item.classList.remove("active");
};

const placeOrderBtn = document.querySelector("#place-order-btn");
const placeOrderOutput = document.querySelector(".place");
const placeOrder = document.querySelector(".place-order");
console.log(placeOrderBtn);
console.log(placeOrderOutput);

placeOrderBtn.addEventListener("click", confimOrder);

function confimOrder() {
  const localStore = localStorage.getItem("cartItem");
  let itemArray = JSON.parse(localStore);
  fetch("http://localhost:4000/api/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: secondName.value,
      email: inputEmail.value,
      phoneNumber: Number(phoneNumber.value),
      address: inputAddressHouse.value,
      landMark: inputAddressColony.value,
      orderItems: itemArray,
      paymentMode: "cash",
    }),
  })
    .then((res) => {
      console.log(res);
      placeOrderOutput.innerHTML = `order placed `;
    })
    .catch((err) => {
      console.log(err);
    });
}


const submitBtn = document.querySelector(".place-order-btn");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("btn clicked");
  document.getElementById("submit_btn").style.display = "block";
})
