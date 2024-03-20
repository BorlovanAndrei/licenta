import Trainer from "../models/Trainers.js";



export const getTrainers = async (req, res) => {
    try{
        const trainers = await Trainer.find();
        res.status(200).json(trainers);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}


export const createTrainer = async (req, res) => {
    try{
        const name = req.body.name;
        const age = req.body.age;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;

        const trainer = await Trainer.create({
            name: name,
            age: age,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
        });

        res.status(200).json({trainer: trainer});
    }catch(error){
        res.status(404).json({message: error.message});

    }
};

export const updateTrainer = async (req, res) => {
    try{
        const trainerId = req.params.id;

        const {name, age, email, phoneNumber, address} = req.body;

        await Trainer.findByIdAndUpdate(trainerId, {
            name,
            age,
            email,
            phoneNumber,
            address
        });

        const trainer = await Trainer.findById(trainerId);

        res.status(200).json({trainer});
    }catch(error){
        res.status(404).json({message: error.message});

    }

};

export const deleteTrainer = async (req, res) =>{
    
    try {
        const trainerId = req.params.id;
        await Trainer.deleteOne({ _id: trainerId });
        res.status(200).json({ success: "Record deleted" });
    } catch (error) {
        res.status(404).json({ error: "Failed to delete record" });
    }
};