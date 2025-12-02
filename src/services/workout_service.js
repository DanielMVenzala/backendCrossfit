const { v4: uuid } = require("uuid");

//Llamamos a la capa del utils
const workout = require("../database/utils");

//El servicio devuelve los datos que estamos pidiendo

const getAllWorkouts = (filterParams) => {
  const allWorkouts = workout.getAllWorkouts(filterParams);
  return allWorkouts;
};

const getAllMembers = (filterParams) => {
  const allMembers = workout.getAllMembers(filterParams);
  return allMembers;
};

const getAllEquipment = () => {
  const allEquipment = workout.getAllEquipment();
  return allEquipment;
};

const getAllModes = () => {
  const allModes = workout.getAllModes();
  return allModes;
};

const getOneWorkout = (id) => {
  const oneWorkout = workout.getOneWorkout(id);
  return oneWorkout;
};

const createNewWorkout = (newWorkout) => {
  //Se añaden los atributos que no se pueden introducir manualmente
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  const createdWorkout = workout.createNewWorkout(workoutToInsert);
  return createdWorkout;
};

const updateOneWorkout = (id, changes) => {
  const updatedWorkout = workout.updateOneWorkout(id, changes);
  return updatedWorkout;
};

const deleteOneWorkout = (id) => {
  workout.deleteOneWorkout(id);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
  getAllMembers,
  getAllEquipment,
  getAllModes,
};
