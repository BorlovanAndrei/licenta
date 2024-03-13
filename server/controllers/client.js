import Plan from "../models/Plan.js"
import PlanStat from "../models/PlanStat.js"

export const getPlans = async (req, res) =>{
    try{
        const plans = await Plan.find();

        const plansWithStats = await Promise.all(
            plans.map(async (plan) =>{
                const stat = await PlanStat.find({
                    planId: plan._id
                });
                return{
                    ...plan._doc,
                    stat,
                };
            })
        );
        res.status(200).json(plansWithStats);
    }catch{
        res.status(404).json({message: error.message});
    }
}