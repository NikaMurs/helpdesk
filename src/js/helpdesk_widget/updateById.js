export function updateTickStatus(id, tickStatus) {
  let status;
  if (tickStatus === "false") {
    status = false;
  }
  if (tickStatus === "true") {
    status = true;
  }

  const updateTicket = {
    tickStatus: status,
  };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:7070" + `/?method=updateById&id=${id}`);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(updateTicket));
}

export function updateTicket(id, name, description) {
  const updateTicket = {
    name,
    description,
  };
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:7070" + `/?method=updateById&id=${id}`);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(updateTicket));
}
