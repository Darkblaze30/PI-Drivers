const { driverCreate } = require("../controllers/driversController")
const { Drivers, Teams} = require("../db");


const postDrivers = async (req, res) => {
 // const {name, Description, Plataform,img,releaseDate,rating} = req.body
 try{
    const{name, lastName, description, img, nationality, birthdate, teams}= req.body;
    const newVideogame = await driverCreate(name,lastName, description, img, nationality, birthdate, teams)
    res.send(newVideogame);
} catch (error) {
    res.status(400).send("error:" + error.message)     
}}


module.exports = {
    postDrivers,
}