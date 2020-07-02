"use strict";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const table = "Users";
const collectionSchema = new Schema(
    {
        name: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        create_date: { type: Date},
        modify_date: { type: Date},
    },
  { collection: table }
);
module.exports = mongoose.model(table, collectionSchema);
