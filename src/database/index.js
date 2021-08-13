'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // structure of data {"age": count}
        const data = {};

        //find all the usernames associated with that item
        const usernamesThatHaveItem = [];
        
        _.forOwn(db.itemsOfUserByUsername, function(itemsOfUser, username) {
            _.find(itemsOfUser, function(itemOfUser) {
                if (itemOfUser === item) {
                    usernamesThatHaveItem.push(username)
                    return true;
                }
            });
         } );

         // construct data 
         _.forOwn(db.usersById, function(user, id) {
             usernamesThatHaveItem.map((username)=> {
                 if (username === user.username) {
                    if (data[user.age]) data[user.age] += 1
                    else data[user.age] = 1;
                 }
             })
         } );

         return data; 

    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
