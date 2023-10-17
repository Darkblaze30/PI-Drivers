const axios = require("axios")
const { teamsCleaner } = require("../utils/cleaners")
const {Teams} = require("../db")

const getAllTeams = async () => {
    try {
        const infoApi = await axios.get('http://localhost:5000/drivers');
        const teams = teamsCleaner(infoApi.data);
        const teamsSinRepetir = Array.from(new Set(teams));
        
        // Usar Promise.all para crear registros en paralelo
        await Promise.all(teamsSinRepetir.map(async (team) => {
            await Teams.create({ name: team });
        }));

        const allTeams = await Teams.findAll();
        return allTeams;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
module.exports = {
    getAllTeams
}