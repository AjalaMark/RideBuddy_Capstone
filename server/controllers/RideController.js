import { RideModel } from "../models/RideModel.js";
import {CityModel } from "../models/CityModel.js"

export default class RideController {
    static get_ride = async (req, res) => {
        try {
            let filter = {}
            const {startCity, endCity, departTime, passengerNum} = req.body;
            if (startCity) {
                const startCityObj = await CityModel.findOne({name: startCity});
                if (startCityObj) {
                    filter.startCity = {_id: startCityObj._id}
                }
            }
            if (endCity) {
                const endCityObj = await CityModel.findOne({name: endCity});
                if (endCityObj) {
                    filter.endCity  = {_id: endCityObj._id}
                }
            }
            if (departTime) {
                let departTimeDateLT1H = new Date(departTime);
                departTimeDateLT1H.setHours(departTimeDateLT1H.getHours()+1);
                let departTimeDateGT1H = new Date(departTime);
                departTimeDateGT1H.setHours(departTimeDateGT1H.getHours()-1);
                filter.departTime = {$lte: departTimeDateLT1H, $gte: departTimeDateGT1H}
            }
            
            const rides = await RideModel.find(filter).populate("driver").populate("startCity").populate("endCity");
            res.status(200).json({ rides, message: "ride get successfully" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
    static post_ride = async (req, res) => {
        try {
            let {startCity, endCity, departTime} = req.body;
            const startCityObj = await CityModel.findOne({name: startCity});
            const endCityObj = await CityModel.findOne({name: endCity});
            departTime = new Date(departTime);
            if (!startCityObj || !endCityObj || !departTime) {
                return res.status(500).json({ message: "fields missing" });
            }
            const ride = new RideModel({
                driver: req.user.userId,
                startCity: startCityObj._id,
                endCity: endCityObj._id,
                departTime
            })
            await ride.save();
            res.status(200).json({ message: "ride post successfully" });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
