import Plan from "../models/Plan.js"
import PlanStat from "../models/PlanStat.js"
import User from "../models/User.js";

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

export const getMembers = async (req, res) => {
    try{
        const customers = await User.find().select("-password");
        res.status(200).json(customers);
    }catch{
        res.status(404).json({message: error.message});
    }
}


// export const createPlan = async (req, res) => {
//     const { name, price, description, category } = req.body;

//     try {
//         // Check if the required fields are provided
//         if (!name || !price || !description || !category) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Create a new plan instance
//         const newPlan = new Plan({
//             name,
//             price,
//             description,
//             category,
//         });

//         // Save the new plan to the database
//         await newPlan.save();

//         res.status(201).json({ message: "Plan created successfully", plan: newPlan });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const createPlan = async (req, res) => {
//     const name = req.body.name;
//     const price = req.body.price;
//     const description = req.body.description;
//     const category = req.body.category;

//     const plan = await Plan.create({
//         name: name,
//         price: price,
//         description: description,
//         category: category
//     });

//     res.json({plan: plan});

// };

// export const updatePlan = async (req, res) => {
//     const planId = req.params.id;

//     const {name, price, description, category} = req.body;

//     await Plan.findByIdAndUpdate(planId, {
//         name,
//         price,
//         description,
//         category,
//     });

//     const plan = await Plan.findById(planId);

//     res.json({plan});

// };