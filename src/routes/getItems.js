"use strict";
const mockDBCalls = require("../database/index.js");

const getItemsHandler = async (request, response) => {
  try {
    const data = await mockDBCalls.getItems();
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    return res.status(500).send({ error: "Something failed!" });
  }
};

module.exports = (app) => {
  app.get("/items", getItemsHandler);
};
