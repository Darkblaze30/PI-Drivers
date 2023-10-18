const { Drivers, Teams} = require("../db");
const axios = require("axios");
const { infoAllCleaner, infoCleaner } = require("../utils/cleaners");
const Sequelize = require("sequelize");

const allDrivers = async () => {
  const infoApi = (await axios.get("http://localhost:5000/drivers")).data;
  const driversBdd = await Drivers.findAll({
    include: [
      {
        model: Teams,
        attributes: ["name"],
        through: {
          attributes: [] // Puedes especificar qué atributos mostrar aquí si es necesario
        }
      }
    ]
  });
  const driversApi = infoAllCleaner(infoApi);
  return [...driversBdd, ...driversApi];
};

const driversByName = async (name) => {
  const infoApi = (
    await axios.get(`http://localhost:5000/drivers`)
  ).data;
  const driver = infoAllCleaner(infoApi);
  const driverBdd = await Drivers.findAll({include: [
    {
      model: Teams,
      attributes: ["name"],
      through: {
        attributes: [] // Puedes especificar qué atributos mostrar aquí si es necesario
      }
    }
  ]});
  const response = [...driverBdd, ...driver];
  const responsefilter = response.filter((driver) => driver.name.toLowerCase().includes(name.toLowerCase()) )
  if(!responsefilter.length) throw Error(`no se encontro ningun driver con este nombre`)
  return responsefilter;
};

const driversById = async (id, source) => {
  if (source === "API") {
    const infoApi = (await axios.get(` http://localhost:5000/drivers/${id}`))
      .data;
    const driver = infoCleaner(infoApi);
    return driver;
  } else {
    const infoBdd = await Drivers.findByPk(id, {
      include: [
        {
          model: Teams,
          attributes: ["name"],
          through: {
            attributes: [] // Puedes especificar qué atributos mostrar aquí si es necesario
          }
        }
      ]
    });
    if (!infoBdd) throw Error(`not exist a driver with is id`);
    return infoBdd;
  }
};

const driverCreate = async (name, lastName, description, img, nationality, birthdate, teams) => {
    // Crea el nuevo conductor en la tabla "Drivers"
    const newDriver = await Drivers.create({ name, lastName, description, img, nationality, birthdate });
  
    // Agrega la relación entre el conductor y los equipos en la tabla intermedia
    await newDriver.addTeams(teams);
  
    // Ahora, obtén al conductor con los equipos asociados cargados
    const driverWithTeams = await Drivers.findByPk(newDriver.id, {
      include: [
        {
          model: Teams,
          attributes: ["name"],
          through: {
            attributes: [] // Puedes especificar qué atributos mostrar aquí si es necesario
          }
        }
      ]
    });
  
    return driverWithTeams;
  };
  
module.exports = {
  allDrivers,
  driversByName,
  driversById,
  driverCreate,
};
