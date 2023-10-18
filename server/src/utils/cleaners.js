const teamsStringToArray = (teams) => {
    if (teams) {
      return teams.split(', ').map(team => {
        return { name: team };
      });
    } else {
      return [];
    }
  };

const infoAllCleaner = (drivers) => {
    return drivers.map(driver => {
        return info = {
            id: driver.id,
            name: driver.name.forename,
            lastName: driver.name.surname,
            description: driver.description,
            img: driver.image.url,
            nationality: driver.nationality,
            birthdate: driver.dob,
            Teams: teamsStringToArray(driver.teams),
        }
    })
}

const infoCleaner = (driver) => {
   return { 
    id: driver.id,
    name: driver.name.forename,
    lastName: driver.name.surname,
    description: driver.description,
    img: driver.image.url,
    nationality: driver.nationality,
    birthdate: driver.dob,
    Teams: teamsStringToArray(driver.teams),

   }
}


const teamsCleaner = (drivers) => {
    const equipos = new Set();

    // Itera a través de los datos y agrega cada equipo al conjunto
    drivers.forEach(conductor => {
        if (conductor.teams) {
            const equiposConductor = conductor.teams.split(',').map(team => team.trim());
            equiposConductor.forEach(equipo => equipos.add(equipo));
        }
    });

    const equiposSinDuplicados = Array.from(equipos);
    return equiposSinDuplicados
}



module.exports = {
    infoAllCleaner,
    infoCleaner,
    teamsCleaner
}
