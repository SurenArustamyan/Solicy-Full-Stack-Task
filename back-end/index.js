import express from "express";
import cors from "cors"
import { getUsers } from "./helpers.js";
import prisma from "./services/Prisma.js";
const port = 8008;
const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
  });


  app.get("/accounts", async (req, res) => {
    const { filter } = req.query;
    const myUsers = await getUsers(filter);
    res.send(myUsers);
  })

  app.get("/accounts/:accountId", async (req, res) => {
    const { accountId: accountIdStr } = req.params;
    const accountId = Number(accountIdStr) || 0;
    const myUser = await prisma.user.findMany({
      where: {
        id: accountId,
      },
    });
    if (!accountId) return res.status(400).json({ message: "Bad Request" });
  
    const foundUser = myUser.find((user) => user.id === accountId);
  
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    res.send(myUser);
  });


  app.delete("/accounts/:accountId", async (req,res) => {
    const { accountId: accountIdStr } = req.params
    const accountId = Number(accountIdStr) || 0
    const deletedAccount = await prisma.user.delete({
        where:{
            id: accountId
        }
    })
    res.send(deletedAccount)
  })

  app.post("/accounts", async (req, res) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", async () => {
      const { name, owner } = JSON.parse(data);
      if (!name || !owner) {
        return res.status(400).json({ message: "Bad Request" });
      }
      const newAccount = await prisma.user.create({
        data: {
          name: String(name),
          owner: String(owner)
        },
      });
      res.send(newAccount);
    });
  });

  app.put("/accounts/:accountId", async (req, res) => {
    const { accountId: accountIdStr } = req.params;
    const accountId = Number(accountIdStr) || 0;
    console.log(accountId);
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", async () => {
      const { name } = JSON.parse(data);
      if (!name) {
        return res.status(400).json({ message: "Bad Request" });
      }
      const updatedAccount = await prisma.user.update({
        data: {
          name: String(name),
          id: accountId,
        },
        where: {
          id: accountId,
        },
      });
      res.send(updatedAccount);
    });
  });