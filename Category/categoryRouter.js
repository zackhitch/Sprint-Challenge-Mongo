const express = require('express');
const mongoose = require('mongoose');
const Category = require('./Category');

const router = express.Router();

router
  .route('/')
  .post((req, res) => {
    if (req.body.title) {
      const newCategory = new Category(req.body);

      newCategory
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res
        .status(404)
        .json({ message: 'User error: not all required fields completed.' });
    }
  })
  .get((req, res) => {
    Category.find({})
      .select({ title: 1, _id: 0 })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;
