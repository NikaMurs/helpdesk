const deleteTicketWrapper = document.querySelector(".deleteTicketWrapper");
const ticketsList = document.querySelector(".ticketsList");
const cancelButton = deleteTicketWrapper.querySelector(".cancelButton");
const submitButton = deleteTicketWrapper.querySelector(".submitButton");

export default function deleteTicket(id, element) {
  deleteTicketWrapper.classList.remove("hide");
  ticketsList.classList.add("hide");

  function submit(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://helpdeskbackend.onrender.com" + `/?method=deleteById&id=${id}`
    );
    xhr.send();
    element.remove();
    deleteTicketWrapper.classList.add("hide");
    ticketsList.classList.remove("hide");
    submitButton.removeEventListener("click", submit);
    cancelButton.removeEventListener("click", cancel);
  }

  function cancel() {
    deleteTicketWrapper.classList.add("hide");
    ticketsList.classList.remove("hide");
    submitButton.removeEventListener("click", submit);
    cancelButton.removeEventListener("click", cancel);
  }

  submitButton.addEventListener("click", submit);

  cancelButton.addEventListener("click", cancel);
}
