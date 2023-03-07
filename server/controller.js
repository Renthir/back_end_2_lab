let houses = require('./db.json')
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        let { id } = req.params
        let idx = houses.findIndex(house => house.id === +id)
        if(idx >= 0){
            houses.splice(idx, 1)
            res.status(200).send(houses)
        } else {
            res.sendStatus(404)
        }
    },

    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        if(!address || !price || !imageURL){
            res.status(400).send('Please use valid and complete data')
        } else {
            let newHouse = {...req.body, price: +price, id: houseId}
            houses.push(newHouse)
            houseId++
            res.status(200).send(houses)
        }
    },

    updateHouse: (req, res) => {
        let { id } = req.params
        let {type} = req.body
        let idx = houses.findIndex(house => house.id === +id)
        if(type === 'plus') {
            houses[idx].price += 10000
        } else if (type === 'minus') {
            houses[idx].price -= 10000
            if (houses[idx].price < 0){
                houses[idx].price = 0
            }
        }
        res.status(200).send(houses)
    },

}