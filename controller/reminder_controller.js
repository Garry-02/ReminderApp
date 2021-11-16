// let database = require("../database");
let { database } = require("../models/userModel")

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database[0].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {     // feature to update the reminder 
    // implement this code
   let reminderToUpdate = database.cindy.reminders.find(function (reminder) {   // finds the reminder to be updated
     return reminder.id == req.params.id;   
   });
    // updates the data of the reminder 
     reminderToUpdate.title =  req.body.title;
     reminderToUpdate.description = req.body.description;
     reminderToUpdate.completed = req.body.completed === "true";    
    
    res.redirect("/reminders");   // redirect to "/reminders"
},

  delete: (req, res) => {   // feature to delete the reminder 
    // Implement this code
    reminderToDelete = database.cindy.reminders.find(function (reminder) {    // finds the reminder to be deleted
      return reminder.id == req.params.id;
    });

    database.cindy.reminders.splice(reminderToDelete, 1);   // deletes the reminder 

    res.redirect("/reminders");   // redirect to "/reminders"
  },
};

module.exports = remindersController;
