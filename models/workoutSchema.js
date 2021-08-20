const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: {
    type: Array,
    'default': []
  },
  workoutDuration: {
    type: Number,
    'default': 0
  }
});

WorkoutSchema.methods.setDuration = function() {
  let workoutDuration = 0;
  this.exercises.forEach(exercise => {
    workoutDuration += exercise.duration;
  });
  this.workoutDuration = workoutDuration;
};

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;
