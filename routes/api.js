const { Workout } = require('../models');

module.exports = (app) => {

  app.get('/api/workouts', async (req, res) => {
    const allWorkouts = await Workout.find({})
    allWorkouts.forEach(workout => {
      workout.setDuration();
    });
    res.json(allWorkouts);
  });

  app.get('/api/workouts/range', async (req, res) => {
    const workoutRange = await Workout.find({}).sort({'day': -1}).limit(7)
    workoutRange.forEach(workout => {
      workout.setDuration();
    });
    res.json(workoutRange);
  });

  app.post('/api/workouts', async (req, res) => {
    const newWorkout = await Workout.create({ 
      exercises: [], 
      day: new Date() 
    })
    res.json(newWorkout);
  });

  app.put('/api/workouts/:id', async (req, res) => {
    const updateWorkout = await Workout.findOne({ 
      _id: req.params.id 
    });
    updateWorkout.exercises.push(req.body);
    updateWorkout.setDuration();
    await updateWorkout.save();
    res.json(updateWorkout);
  });

};
