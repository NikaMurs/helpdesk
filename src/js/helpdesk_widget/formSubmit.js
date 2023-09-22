/* eslint-disable no-undef */
const moment = require("moment");
const formTextarea = document.querySelector(".formTextarea");
const formInput = document.querySelector(".formInput");
const formSubmitButton = document.querySelector(".formSubmitButton");
import "moment/locale/ru";
import createTicket from "./createTicket";

formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const ticket = {
    id: null,
    name: formInput.value.trim(),
    tickStatus: false,
    description: formTextarea.value.trim(),
    created: moment().format("L") + " " + moment().format("LT"),
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };
  xhr.open(
    "POST",
    "https://helpdeskbackend.onrender.com" + "/?method=createTicket"
  );
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(ticket));
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    createTicket(
      response.id,
      response.tickStatus,
      response.name,
      response.created
    );
  });
});
