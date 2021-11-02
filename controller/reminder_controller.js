let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
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

  update: (req, res) => {
    // implement this code
   let reminderToUpdate = database.cindy.reminders.find(function (reminder) {
     return reminder.id == req.params.id;
   });
   
     reminderToUpdate.title =  req.body.title;
     reminderToUpdate.description = req.body.description;
     reminderToUpdate.completed = Boolean(req.body.completed);
    
    res.redirect("/reminders");
},

  delete: (req, res) => {
    // Implement this code
    reminderToDelete = database.cindy.reminders.find(function (reminder) {
      return reminder.id == req.params.id;
    });

    database.cindy.reminders.splice(reminderToDelete, 1);

    res.redirect("/reminders");
  },
};

module.exports = remindersController;
