"use strict";
const mockDBCalls = require("../database/index.js");

const getUsersHandler = async (request, response) => {
  try {
    const data = await mockDBCalls.getUsers();
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    return res.status(500).send({ error: "Something failed!" });
  }
};

module.exports = (app) => {
  app.get("/users", getUsersHandler);
};
