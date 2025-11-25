//Importamos express y las rutas
const express = require("express")
const v1WorkoutRouter = require("./v1/routes/workout_routes")
const cors = require("cors")

//Llamamos a la capa de express
const app = express();
app.use(express.json())

app.use(cors())

//Se define el puerto
const PORT = process.env.PORT || 3000;

//Definimos el baseUrl, vinculado al router
app.use("/api/v1/workouts", v1WorkoutRouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})