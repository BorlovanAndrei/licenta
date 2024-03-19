import Equipment from "../models/Equipment.js";


export const getEquipments = async (req, res) =>{
    try{
        const equipment = await Equipment.find();

        res.status(200).json(equipment);
    }catch{
        res.status(404).json({message: error.message});
    }
}

export const createEquipment = async (req, res) => {
    try{
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const category = req.body.category;

        const equipment = await Equipment.create({
            name: name,
            price: price,
            description: description,
            category: category
        });

        res.status(200).json({equipment: equipment});
    }catch{
        res.status(404).json({message: error.message});

    }
    

};

export const updateEquipment = async (req, res) => {
    try{
        const equipmentId = req.params.id;

        const {name, price, description, category} = req.body;

        await Equipment.findByIdAndUpdate(equipmentId, {
            name,
            price,
            description,
            category,
        });

        const equipment = await Equipment.findById(equipmentId);

        res.status(200).json({equipment});
    }catch{
        res.status(404).json({message: error.message});

    }
    
};



export const deleteEquipment = async (req, res) =>{
    
    try {
        const equipmentId = req.params.id;
        await Equipment.deleteOne({ _id: equipmentId });
        res.status(200).json({ success: "Record deleted" });
    } catch (error) {
        res.status(404).json({ error: "Failed to delete record" });
    }
};