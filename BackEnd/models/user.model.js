"use strict";
const dbConn = require("../config/db.config");

// User object create
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.dob = new Date(user.dob);
  this.gender = user.gender;
  this.hobbies = user.hobbies;
  this.interests = user.interests;
};

User.create = function (newUser, result) {
  dbConn.query("INSERT INTO user SET ?", newUser, function (err, res) {
    if (err) {
      console.error("Error creating user: ", err);
      result(err, null);
    } else {
      console.log("User created successfully with ID: ", res.insertId);
      result(null, res.insertId);
    }
  });
};

User.findById = function (id, result) {
  dbConn.query("SELECT * FROM user WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error finding user by ID: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.findAll = function (result) {
  dbConn.query("SELECT * FROM user", function (err, res) {
    if (err) {
      console.error("Error finding all users: ", err);
      result(err, null);
    } else {
      console.log("Users: ", res);
      result(null, res);
    }
  });
};

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE user SET firstname=?, lastname=?, email=?, dob=?, gender=?, hobbies=?, interests=? WHERE id = ?",
    [
      user.firstname,
      user.lastname,
      user.email,
      user.dob,
      user.gender,
      user.hobbies,
      user.interests,
      id,
    ],
    function (err, res) {
      if (err) {
        console.error("Error updating user: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.delete = function (id, result) {
  dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.error("Error deleting user: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
