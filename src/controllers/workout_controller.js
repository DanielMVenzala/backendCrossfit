//importamos la capa del servicio
const workoutService = require("../services/workout_service")



//Definimos todos los métodos
const getAllWorkouts = (req, res) => {
    const {mode, limit} = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({mode, limit})
        res.send({status: "ok", data: allWorkouts})
    } catch (error) {
        res
            .status(500)
            .send({status: "FAILED", data: {error: error?.message || String(error)}})
    }
}

const getOneWorkout = (req, res) => {

    //en la request debe ir el param id
    const {
        params: {id},
    } = req;

    //si no se introduce una id lanzamos error 400
    if(!id) {
        res
            .status(400)
            .send({status: "FAILED", data: {error: 'Tienes que introducir una ID'}});
            return
    }
    try {
        //pedimos la "respuesta" al servicio
        const oneWorkout = workoutService.getOneWorkout(id)
        res.send({status: "ok", data: oneWorkout})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || String(error)}})
    }
}






const createNewWorkout = (req, res) => {
    //Llamamos al body y comprobamos que se hayan introducido los atributos
    const {body} = req;

    if(
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res
            .status(400)
            .send({status: "FAILED", data: {error: "Faltan campos obligatorios en el body"}})
        return;
    }

    //Se crea el nuevo entreno y se manda al servicio
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    };
    try {
        const createdWorkout = workoutService.createNewWorkout(newWorkout);
        res.status(201).send({status: "OK", data: createdWorkout})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || String(error)}})
    }
}

const updateOneWorkout = async (req, res) => {
    const {
        body,
        params: {id},
    } = req;

    if (!id) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {error: "Parámetro 'id' no puede estar vacío"}
            })
            return;
    }

    try {
        const updatedWorkout = await workoutService.updateOneWorkout(id, body);
        res.send({status: "OK", data: updatedWorkout})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || String(error)}
})
    }
}

const deleteOneWorkout = (req, res) => {
    const {
        params: {id},
    } = req;

    if(!id) {
        res
            .status(400)
            .send({status: "FAILED", data: {error: 'Tienes que introducir una ID'}})
    }

    try {

        workoutService.deleteOneWorkout(id);
        res.status(204).send({status: "OK"})
    } catch(error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || String(error)}})
    }
}

//Exportamos todos los métodos
module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}