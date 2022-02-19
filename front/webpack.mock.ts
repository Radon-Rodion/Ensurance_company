// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
import { ProductInfo, productInfos } from "@/data/productInfos";
import filter from "@/api/serverOperations/filterProductInfo";
import select, { sort } from "@/api/serverOperations/selectProductInfo";
import {
  findUserInfoByLogin,
  findUserInfoByName,
  findIndexById,
  findIndexByName,
} from "@/api/serverOperations/findUserInfo";
import users from "@/data/users";
import { checkNameExists, defineNewItemKey, findIndexByKey } from "@/api/serverOperations/editProductsList";

const usersList = users;
const gamesList = productInfos;

export default webpackMockServer.add((app, helper) => {
  // products requests
  app.get("/api/products", (_req, res) => {
    const nameFilter = (_req?.query?.name as string) ?? "";
    const categoryFilter = (_req?.query?.category as string) ?? "";
    const genreFilter = (_req?.query?.genre as string) ?? "";
    const ageFilter = +(_req?.query?.age as string) ?? 0;
    const sortCriteria = (_req?.query?.criteria as string) ?? "";
    const sortAscOrder = (_req?.query?.order as string) === "asc";

    const response = {
      products: sort(sortCriteria, sortAscOrder, filter(nameFilter, categoryFilter, genreFilter, ageFilter, gamesList)),
    };
    return res.json(response);
  });

  app.get("/api/topProducts", (_req, res) => {
    const fieldName = (_req?.query?.category as string) ?? "name";
    const amount = +(_req?.query?.amount as string) ?? 1;
    const response = {
      products: select(fieldName, amount, gamesList),
    };
    return res.json(response);
  });

  // sign requests
  app.post("/api/auth/signIn", (req, res) => {
    const response = findUserInfoByLogin(req.body.login, usersList);
    if (response !== undefined && response.password === req.body.password)
      res.status(201).json({ body: response || null, success: true });
    else res.status(400).json({ body: undefined || null, success: false });
  });

  app.put("/api/auth/signUp", (req, res) => {
    const existingInfo = findUserInfoByLogin(req.body.login, usersList);
    if (existingInfo === undefined) {
      usersList.push({
        id: usersList.length,
        login: req.body.login,
        password: req.body.password,
        userName: req.body.login,
        balance: 3500,
        isAdmin: false,
      });
      res.json({ body: req.body || null, success: true });
    } else res.status(400).json({ body: undefined || null, success: false });
  });

  // profile requests
  app.get("/api/getProfile", (_req, res) => {
    const userName = (_req?.query?.user as string) ?? "";
    const userInfo = findUserInfoByName(userName, usersList);
    if (userInfo === undefined) res.status(400).json(undefined || null);
    return res.json(userInfo);
  });

  app.post("/api/saveProfile", (req, res) => {
    const index = findIndexById(req.body.id, usersList);
    if (index >= 0 && index < usersList.length) {
      usersList[index] = req.body;
      res.json({ body: usersList[index] || null, success: true });
    } else res.status(400).json({ body: undefined || null, success: false });
  });

  app.post("/api/changePassword", (req, res) => {
    const index = findIndexById(req.body.id, usersList);
    if (index >= 0 && index < usersList.length) {
      usersList[index].password = req.body.password;
      res.json({ body: usersList[index].password || null, success: true });
    } else res.status(400).json({ body: undefined || null, success: false });
  });

  app.post("/api/changeBalance", (req, res) => {
    const index = findIndexByName(req.body.userName, usersList);
    if (index !== -1) {
      usersList[index].balance = req.body.balance;
      res.json({ body: usersList[index].balance || null, success: true });
    } else res.status(400).json({ body: undefined || null, success: false });
  });

  // admin requests
  app.post("/api/product", (req, res) => {
    const newGame: ProductInfo = req.body;

    if (checkNameExists(newGame.name, gamesList)) {
      res.status(400).json({ body: undefined || null, success: false });
      return;
    }

    newGame.additionDate = new Date();
    newGame.key = defineNewItemKey(gamesList);
    gamesList.push(newGame);
    res.json({ body: newGame || null, success: true });
  });

  app.put("/api/product", (req, res) => {
    const updatedGame: ProductInfo = req.body;
    const index = findIndexByKey(updatedGame.key, gamesList);
    if (index !== -1) {
      gamesList[index] = updatedGame;
      res.json({ body: gamesList[index] || null, success: true });
    } else {
      res.status(400).json({ body: undefined || null, success: false });
    }
  });

  app.delete("/api/product/*", (req, res) => {
    const reqSubdomains = req.url.split("/");
    const key = +reqSubdomains[reqSubdomains.length - 1];
    const index = findIndexByKey(key, gamesList);
    if (index === -1) {
      res.status(400).json({ body: undefined || null, success: false });
      return;
    }
    // replace to make deleting element the last if necessary
    if (index !== gamesList.length - 1) {
      const temp = gamesList[index];
      gamesList[index] = gamesList[gamesList.length - 1];
      gamesList[gamesList.length - 1] = temp;
    }

    const removedElementKey = gamesList.pop()?.key;
    if (removedElementKey) res.json({ body: removedElementKey || null, success: true });
    else res.status(400).json({ body: undefined || null, success: false });
  });
});
