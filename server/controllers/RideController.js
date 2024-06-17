import { RideModel } from "../models/RideModel";
import {CityModel } from "../models/CityModel"

export default class RideController {
    static get_ride = async (req, res) => {
        try {
            const {startCity, endCity, departTime, passengerNum} = req.body;
            const startCityObj = await CityModel.find({name: startCity});
            const endCityObj = await CityModel.find({name: endCity});
            let departTimeDateLT1H = new Date(departTime);
            departTimeDateLT1H.setHours(departTimeDateLT1H.getHours()+1);
            let departTimeDateGT1H = new Date(departTime);
            departTimeDateGT1H.setHours(departTimeDateGT1H.getHours()-1);
            let filter = {
                startCity: {_id: startCityObj._id},
                endCity: {_id: endCityObj._id},
                departTime: {$lte: departTimeDateLT1H, $gte: departTimeDateGT1H}
            }
            const rides = await RideModel.find(filter)
            res.status(200).json({ rides, message: "ride get successfully" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
    static post_ride = async (req, res) => {
        try {
            const {startCity, endCity, departTime} = req.body;
            const startCityObj = await CityModel.find({name: startCity});
            const endCityObj = await CityModel.find({name: endCity});
            const ride = new RideModel({
                driver: req.user.userId,
                startCity: startCityObj._id,
                endCity: endCityObj._id,
                departTime
            })
            await ride.save;
            res.status(200).json({ message: "ride post successfully" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
