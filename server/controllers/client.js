import Plan from "../models/Plan.js"
//import PlanStat from "../models/PlanStat.js"
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

//PLANS
export const getPlans = async (req, res) =>{
    try{
        const plans = await Plan.find();

        // const plansWithStats = await Promise.all(
        //     plans.map(async (plan) =>{
        //         const stat = await PlanStat.find({
        //             planId: plan._id
        //         });
        //         return{
        //             ...plan._doc,
        //             stat,
        //         };
        //     })
        // );
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
        const customers = await User.find().select("-password");
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
        const transactions = req.body.transactions;
        const password = req.body.password;

        const member = await User.create({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            address: address,
            transactions: transactions
        });

        res.status(200).json({member: member});
    }catch(error){
        res.status(404).json({message: error.message});

    }
};

export const updateMember = async (req, res) => {
    try{
        const memberId = req.params.id;

        const {name, email, phoneNumber, address, transactions} = req.body;

        await User.findByIdAndUpdate(memberId, {
            name,
            email,
            phoneNumber,
            address,
            transactions
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
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
        const generateSort = () => {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };
    
          return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize);
    
        const total = await Transaction.countDocuments({
          name: { $regex: search, $options: "i" },
        });
    
        res.status(200).json({
          transactions,
          total,
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}

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

