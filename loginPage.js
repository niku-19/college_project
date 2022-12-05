"use strict";

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Devanshu kumar",
  pin: 1111,
};

const account2 = {
  owner: "NIkhil Ranjan Kumar",
  pin: 2222,
};

const account3 = {
  owner: "Sir Sir",
  pin: 3333,
};

const account4 = {
  owner: "Rahul Kumar Singh",
  pin: 4444,
};

const accoutn5 = {
  owner: "ADMIN Da Ma Ia N",
  pin: 1999,
};

const accounts = [account1, account2, account3, account4,accoutn5];

const btnLogin = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector("#login__input--user");
const inputLoginPin = document.querySelector("#login__input--pin");

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    document.location.href = "http://127.0.0.1:5501/index.html";
  } else {
    alert("OHO! Wrong password");
    confirm(`You Will Not Connected TO DataBase.
     Do You want To Try Again`);
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }
});
