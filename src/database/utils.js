//Llamamos a la capa de la BDD
const DB = require("./db.json");
const fs = require("fs");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;

    if (!filterParams) {
      return workouts;
    }

    if (filterParams.mode) {
      workouts = workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode.toLowerCase())
      );
    }

    if (filterParams.limit) {
      workouts = workouts.slice(0, filterParams.limit);
    }

    return workouts;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || "Error al leer la base de datos",
    };
  }
};

const getAllEquipment = () => {
  const workouts = DB.workouts;
  const allEquipment = workouts.flatMap((w) => w.equipment || []);
  const uniqueEquipment = [...new Set(allEquipment)];

  return uniqueEquipment;
};

const getAllModes = () => {
  const workouts = DB.workouts;
  const allModes = workouts.flatMap((w) => w.mode || []);
  const uniqueModes = [...new Set(allModes)];

  return uniqueModes;
};

const getAllMembers = ({ startsWith } = {}) => {
  try {
    const allMembers = DB.workouts.flatMap((workout) => workout.members || []);

    // Quitamos duplicados
    let uniqueMembers = [...new Set(allMembers)];

    // filtrado por startswith
    if (startsWith) {
      const letter = startsWith.toLowerCase();
      uniqueMembers = uniqueMembers.filter((name) =>
        name.toLowerCase().startsWith(letter)
      );
    }

    return uniqueMembers;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || "Error al leer la base de datos",
    };
  }
};

const updateOneWorkout = (id, changes) => {
  try {
    if (changes.name) {
      const isAlreadyAdded =
        DB.workouts.findIndex(
          (workout) => workout.name === changes.name && workout.id !== id
        ) > -1;

      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: "Ese entrenamiento con ese nombre ya existe",
        };
      }
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === id
    );
    if (indexForUpdate === -1) {
      throw {
        status: 404, //not found
        message: "No se puede encontrar un entrenamiento con ese id",
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || String(error),
    };
  }
};

const getOneWorkout = (id) => {
  try {
    //vamos a la base de datos y filtramos por el id que nos llega por parámetro
    const workout = DB.workouts.find((workout) => workout.id === id);
    if (!workout) {
      throw { status: 404, message: "No podemos encontrar el ID" };
    }
    return workout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || String(error),
    };
  }
};

const createNewWorkout = (newWorkout) => {
  try {
    const workoutExist =
      DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (workoutExist) {
      throw {
        status: 400,
        message: `Un entrenamiento con el nombre ${newWorkout.name} ya existe`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || String(error),
    };
  }
};

const deleteOneWorkout = (id) => {
  try {
    //Se busca el índice que coincida con el workout de la id
    const index = DB.workouts.findIndex((workout) => workout.id === id);

    if (index === -1) {
      throw {
        status: 404,
        message: "No se puede encontrar un entrenamiento con ese id",
      };
    }
    //Se borra de la base de datos desde el índice y 1 unidad
    DB.workouts.splice(index, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || String(error),
    };
  }
};

const saveToDatabase = (DB) => {
  try {
    fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
      encoding: "utf8",
    });
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || "Error al guardar en la base de datos",
    };
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  saveToDatabase,
  deleteOneWorkout,
  updateOneWorkout,
  getAllMembers,
  getAllEquipment,
  getAllModes,
};
