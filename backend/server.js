/* eslint-disable no-undef */
const http = require("http");
const Koa = require("koa");
const { koaBody } = require("koa-body");

const app = new Koa();
const tickets = [
  {
    id: 0,
    name: "1 тикет",
    tickStatus: false,
    description: "описание первого",
    created: "21.09.2023 20:58",
  },
  {
    id: 1,
    name: "2 тикет",
    tickStatus: false,
    description: "описание второго",
    created: "21.09.2023 20:58",
  },
];

app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
  })
);

app.use((ctx, next) => {
  ctx.response.set("Access-Control-Allow-Origin", "*");
  ctx.response.set("Access-Control-Allow-Headers", "*");
  next();
});

app.use((ctx, next) => {
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
  }
  next();
});

app.use((ctx) => {
  //console.log(ctx.query);

  if (ctx.method === "POST") {
    if (ctx.query.method === "createTicket") {
      const requestBody = ctx.request.body;
      requestBody.id = tickets.length;
      tickets.push(requestBody);
      ctx.response.body = requestBody;
    }
    if (ctx.query.method === "updateById") {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == ctx.query.id) {
          Object.assign(tickets[i], ctx.request.body);
        }
      }
      ctx.response.status = 200;
    }
  }

  if (ctx.method === "GET") {
    if (ctx.query.method === "allTickets") {
      const response = JSON.parse(JSON.stringify(tickets));
      for (let i = 0; i < response.length; i++) {
        delete response[i].description;
      }
      ctx.response.body = response;
    }
    if (ctx.query.method === "ticketById") {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == ctx.query.id) {
          return (ctx.response.body = tickets[i]);
        }
      }
    }
    if (ctx.query.method === "deleteById") {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].id == ctx.query.id) {
          tickets.splice(i, 1);
        }
      }
    }
  }
});

const server = http.createServer(app.callback());

const port = 7070;

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is listening to " + port);
});
