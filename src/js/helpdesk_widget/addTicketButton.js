const addTicketButton = document.querySelector(".addTicketButton");
const addTicketFormWrapper = document.querySelector(".addTicketFormWrapper");
const formCancelButton = document.querySelector(".formCancelButton");
const formInput = document.querySelector(".formInput");
const formTextarea = document.querySelector(".formTextarea");
const ticketsList = document.querySelector(".ticketsList");

addTicketButton.addEventListener("click", () => {
  addTicketFormWrapper.classList.remove("hide");
  ticketsList.classList.add("hide");
});

formCancelButton.addEventListener("click", () => {
  formInput.value = "";
  formTextarea.value = "";
  addTicketFormWrapper.classList.add("hide");
  ticketsList.classList.remove("hide");
});
