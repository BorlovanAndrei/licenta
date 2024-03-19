import Equipment from "../models/Equipment.js";
import Operation from "../models/Operation.js";


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


//Operations
// export const getOperations = async (req, res) => {
//     try {
//         const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
//         const generateSort = () => {
//           const sortParsed = JSON.parse(sort);
//           const sortFormatted = {
//             [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
//           };
    
//           return sortFormatted;
//         };
//         const sortFormatted = Boolean(sort) ? generateSort() : {};

//         const operation = await Operation.find({
//           $or: [
//             { cost: { $regex: new RegExp(search, "i") } },
//             { equipmentId: { $regex: new RegExp(search, "i") } },
//           ],
//         })
//           .sort(sortFormatted)
//           .skip(page * pageSize)
//           .limit(pageSize);
    
//         const total = await Operation.countDocuments({
//           name: { $regex: search, $options: "i" },
//         });
    
//         res.status(200).json({
//             operation,
//             total,
//         });
//       } catch (error) {
//         res.status(404).json({ message: error.message });
//       }
// }


export const getOperations = async (req, res) => {
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

        const operations = await Operation.find({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { equipmentId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize);
    
        const total = await Operation.countDocuments({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { equipmentId: { $regex: new RegExp(search, "i") } },
          ],
        });
    
        res.status(200).json({
            operations,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getOperationsForChart = async (req, res) => {
    try{
        const operation = await Operation.find();
        res.status(200).json(operation);
    }catch{
        res.status(404).json({message: error.message});
    }
}

export const createOperations = async (req, res) => {
    try{
        const cost = req.body.cost;
        const equipmentId = req.body.equipmentId;
        const units = req.body.units;

        const operation = await Operation.create({
            cost: cost,
            equipmentId: equipmentId,
            units: units
        });

        res.status(200).json({operation: operation});
    }catch{
        res.status(404).json({message: error.message});

    }
}