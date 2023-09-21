import noTick from "../icons/noTick.png";
import tick from "../icons/tick.png";
import edit from "../icons/edit.png";
import close from "../icons/close.png";
import { updateTickStatus } from "./updateById";
import editTicket from "./editTicket";
import deleteTicket from "./deleteTicket";
import descriptionTicket from "./descriptionTicket";

const addTicketFormWrapper = document.querySelector(".addTicketFormWrapper");
const formTextarea = addTicketFormWrapper.querySelector(".formTextarea");
const formInput = addTicketFormWrapper.querySelector(".formInput");

const ticketsList = document.querySelector(".ticketsList");

function ticketHTML(id, tickStatus, name, date) {
  let img;
  if (tickStatus) {
    img = tick;
  } else {
    img = noTick;
  }
  return `
       <div class="ticket" data-id=${id}>
        <div class="ticketLeft">
          <img class="ticketIcon" src="${img}" data-tick="${tickStatus}" alt="">
          <p class="ticketName">${name}</p>
        </div>
        <div class="ticketRight">
          <p class="ticketDate">${date}</p>
          <img class="ticketIcon" src="${edit}" alt="">
          <img class="ticketIcon" src="${close}" alt="">
        </div>
      </div>
    `;
}

export default function createTicket(id, tickStatus, name, date) {
  ticketsList.insertAdjacentHTML(
    "beforeend",
    ticketHTML(id, tickStatus, name, date)
  );
  formInput.value = "";
  formTextarea.value = "";
  addTicketFormWrapper.classList.add("hide");
  ticketsList.classList.remove("hide");

  const ticket = ticketsList.querySelector(".ticket:last-child");

  ticket.addEventListener("click", (e) => {
    if (!e.target.classList.contains("ticketIcon")) {
      descriptionTicket(e);
    }
  });

  const buttons = ticketsList
    .querySelector(".ticket:last-child")
    .querySelectorAll(".ticketIcon");
  buttons[0].addEventListener("click", (e) => {
    if (e.target.dataset.tick === "false") {
      e.target.src = tick;
      e.target.dataset.tick = true;
    } else {
      e.target.src = noTick;
      e.target.dataset.tick = false;
    }
    updateTickStatus(
      e.target.parentElement.parentElement.dataset.id,
      e.target.dataset.tick
    );
  });
  buttons[1].addEventListener("click", (e) => {
    editTicket(
      e.target.parentElement.parentElement.dataset.id,
      e.target.parentElement.parentElement
    );
  });
  buttons[2].addEventListener("click", (e) => {
    deleteTicket(
      e.target.parentElement.parentElement.dataset.id,
      e.target.parentElement.parentElement
    );
  });
}
