"use strict";
const mockDBCalls = require("../database/index.js");

const getListOfAgesOfUsersWithHandler = async (request, response) => {
  const itemToLookup = request.query.item;
  if (!itemToLookup)
    return response.status(400).send({ message: "Insufficient query data" });
    
  try {
    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    return response.status(200).send(JSON.stringify(data));
  } catch (error) {
    return res.status(500).send({ error: "Something failed!" });
  }
};

module.exports = (app) => {
  app.get("/users/age", getListOfAgesOfUsersWithHandler);
};
