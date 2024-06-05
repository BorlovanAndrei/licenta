import Plan from "../models/Plan.js"
//import PlanStat from "../models/PlanStat.js"
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

//PLANS
export const getPlans = async (req, res) =>{
    try{
        const plans = await Plan.find();
        res.status(200).json(plans);
    }catch{
        res.status(404).json({message: error.message});
    }
}


export const createPlan = async (req, res) => {
    try{
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const category = req.body.category;

        const plan = await Plan.create({
            name: name,
            price: price,
            description: description,
            category: category
        });

        res.status(200).json({plan: plan});
    }catch{
        res.status(404).json({message: error.message});

    }
    

};

export const updatePlan = async (req, res) => {
    try{
        const planId = req.params.id;

        const {name, price, description, category} = req.body;

        await Plan.findByIdAndUpdate(planId, {
            name,
            price,
            description,
            category,
        });

        const plan = await Plan.findById(planId);

        res.status(200).json({plan});
    }catch{
        res.status(404).json({message: error.message});

    }
    

};

export const deletePlan = async (req, res) =>{
    
    try {
        const planId = req.params.id;
        await Plan.deleteOne({ _id: planId });
        res.status(200).json({ success: "Record deleted" });
    } catch (error) {
        res.status(404).json({ error: "Failed to delete record" });
    }
};

//MEMBERS

export const getMembers = async (req, res) => {
    try{
        const customers = await User.find();
        res.status(200).json(customers);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}


export const createMember = async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;

        const member = await User.create({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
        });

        res.status(200).json({member: member});
    }catch(error){
        res.status(404).json({message: error.message});

    }
};

export const updateMember = async (req, res) => {
    try{
        const memberId = req.params.id;

        const {name, email, phoneNumber, address} = req.body;

        await User.findByIdAndUpdate(memberId, {
            name,
            email,
            phoneNumber,
            address,
        });

        const member = await User.findById(memberId);

        res.status(200).json({member});
    }catch(error){
        res.status(404).json({message: error.message});

    }

};

export const deleteMember = async (req, res) =>{
    
    try {
        const memberId = req.params.id;
        await User.deleteOne({ _id: memberId });
        res.status(200).json({ success: "Record deleted" });
    } catch (error) {
        res.status(404).json({ error: "Failed to delete record" });
    }
};


// Transactions

export const getTransactions = async (req, res) => {
    try {
        const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;

        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            return {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
            };
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const searchConditions = search
            ? {
                $or: [
                    { cost: { $regex: new RegExp(search, "i") } },
                    { userId: { $regex: new RegExp(search, "i") } },
                ],
            }
            : {};

        const transactions = await Transaction.find(searchConditions)
            .sort(sortFormatted)
            .skip(pageNumber * pageSizeNumber)
            .limit(pageSizeNumber);

        const total = await Transaction.countDocuments(searchConditions);

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};




export const getTransactionForChart = async (req, res) => {
    try{
        const transaction = await Transaction.find();
        res.status(200).json(transaction);
    }catch{
        res.status(404).json({message: error.message});
    }
}

export const createTransaction = async (req, res) => {
    try{
        const userId = req.body.userId;
        const cost = req.body.cost;
        const planId = req.body.planId;

        const transaction = await Transaction.create({
            userId: userId,
            cost: cost,
            planId: planId
        });

        res.status(200).json({transaction: transaction});
    }catch{
        res.status(404).json({message: error.message});

    }
}


