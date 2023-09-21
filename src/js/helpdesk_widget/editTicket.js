import { updateTicket } from "./updateById";
const editTicketFormWrapper = document.querySelector(".editTicketFormWrapper");
const formTextarea = editTicketFormWrapper.querySelector(".formTextarea");
const formInput = editTicketFormWrapper.querySelector(".formInput");
const formCancelButton =
  editTicketFormWrapper.querySelector(".formCancelButton");
const formSubmitButton =
  editTicketFormWrapper.querySelector(".formSubmitButton");

const ticketsList = document.querySelector(".ticketsList");

export default function editTicket(id, element) {
  editTicketFormWrapper.classList.remove("hide");
  ticketsList.classList.add("hide");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:7070" + `?method=ticketById&id=${id}`);
  xhr.send();
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    formInput.value = response.name;
    formTextarea.value = response.description;
  });

  function submit(e) {
    e.preventDefault();
    updateTicket(id, formInput.value.trim(), formTextarea.value.trim());
    element.querySelector(".ticketName").textContent = formInput.value.trim();
    if (element.querySelector(".ticketDescreption")) {
      element.querySelector(".ticketDescreption").textContent =
        formTextarea.value.trim();
    }

    formInput.value = "";
    formTextarea.value = "";
    editTicketFormWrapper.classList.add("hide");
    ticketsList.classList.remove("hide");
    formSubmitButton.removeEventListener("click", submit);
    formCancelButton.removeEventListener("click", cancel);
  }

  function cancel() {
    formInput.value = "";
    formTextarea.value = "";
    editTicketFormWrapper.classList.add("hide");
    ticketsList.classList.remove("hide");
    formSubmitButton.removeEventListener("click", submit);
    formCancelButton.removeEventListener("click", cancel);
  }

  formSubmitButton.addEventListener("click", submit);
  formCancelButton.addEventListener("click", cancel);
}
