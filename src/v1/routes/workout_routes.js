const express = require("express");

//Llamamos a la capa del router
const router = express.Router();

//Llamamo al controlador
const workoutControler = require("../../controllers/workout_controller");

//definimos los endpoints, cuyos métodos están en el controlador
router.get("/", workoutControler.getAllWorkouts);
router.get("/members", workoutControler.getAllMembers);
router.get("/equipment", workoutControler.getAllEquipment);
router.get("/modes", workoutControler.getAllModes);
router.get("/:id", workoutControler.getOneWorkout);
router.post("/", workoutControler.createNewWorkout);
router.patch("/:id", workoutControler.updateOneWorkout);
router.delete("/:id", workoutControler.deleteOneWorkout);

module.exports = router;
