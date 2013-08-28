'use strict';

var users = [];

var API = {
    getUsers: function(cb){
        cb(null, users);
    },
    getUsersSync: function(){
        return [null, users];
    }
};

exports.UserProvider = API;