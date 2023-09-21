function ticketDescreption(desc) {
  return `
    <div class="ticketDescreption">
        <p>${desc}</p>
    </div>
    `;
}

export default function descriptionTicket(elem) {
  let desc;
  if (elem.target.closest(".ticket").querySelector(".ticketDescreption")) {
    elem.target.closest(".ticket").querySelector(".ticketDescreption").remove();
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "http://localhost:7070" +
        `?method=ticketById&id=${elem.target.closest(".ticket").dataset.id}`
    );
    xhr.send();
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.response);
      desc = response.description;
      elem.target
        .closest(".ticket")
        .insertAdjacentHTML("beforeend", ticketDescreption(desc));
    });
  }
}
