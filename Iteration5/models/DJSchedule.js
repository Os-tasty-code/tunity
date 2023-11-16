/**************************/
/* Author: Ramsha Kapadia */
/* This is the schema for */
/* the schedule of DJs    */
/* for a producer user.   */
/**************************/
const mongoose = require('../database');
const Schema = mongoose.Schema;

const djScheduleSchema = new Schema({
    djName: {type: String, required: true},
    day: {type: Number, required: true},
    timeSection: {type: String, required: true}
}, {timestamps: true});

const djScheduleModel = mongoose.model('DJSchedule', djScheduleSchema);
module.exports = djScheduleModel;