const postDrivers = (req, res) => {
    const {name, lastName} = req.body
    res.send(`quiero crear un driver con el nombre ${name} y apellido ${lastName}`)
}

module.exports = {
    postDrivers,
}