import createTicket from "./createTicket";

window.addEventListener("DOMContentLoaded", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:7070" + "/?method=allTickets");
  xhr.send();
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    if (response.length == 0) {
      return;
    } else {
      for (let i = 0; i < response.length; i++) {
        createTicket(
          response[i].id,
          response[i].tickStatus,
          response[i].name,
          response[i].created
        );
      }
    }
  });
});
