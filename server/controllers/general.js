import Trainer from "../models/Trainers.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Classes from "../models/Classes.js";


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


// Admin

export const signUp = async  (req, res) =>{
    try {
      const { email, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);
  
      await Admin.create({ email, password: hashedPassword });
  
      res.status(200).json({ success: "Admin created" });;
    } catch (error) {
        res.status(404).json({ error: "Failed to create admin" });
    }
  }
  
export const logIn =  async (req, res) =>{
    try {
      // Get the email and password off rq body
      const { email, password } = req.body;
  
      // Find the user with requested email
      const admin = await Admin.findOne({ email });
      if (!admin) return res.sendStatus(401);
  
      // Compare sent in password with found user password hash
      const passwordMatch = bcrypt.compareSync(password, admin.password);
      if (!passwordMatch) return res.sendStatus(401);
  
      // create a jwt token
      const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
      const token = jwt.sign({ sub: admin._id, exp }, process.env.SECRET);
  
      // Set the cookie
      res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
  
      // send it
      res.sendStatus(200);
    } catch (error) {
      res.status(404).json({ error: "Failed to logIn" });
    }
  }
  
export const logOut = async (req, res) =>{
    try {
      res.cookie("Authorization", "", { expires: new Date() });
      res.sendStatus(200);
    } catch (error) {
      res.status(404).json({message: error.message});
    }
  }
  
export const checkAuth =  function checkAuth(req, res) {
    try {
        console.log(req.admin)
      res.sendStatus(200);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  }



  //Classes
  export const getClasses = async (req, res) => {
    try {
      const classes = await Classes.find();
      res.status(200).json(classes);
    } catch (error) {
      res.status(404).json({ error: "Failed to fetch classes from the database" });
    }
  };

export const createClass = async (req, res) =>{
   try {
    const newClass = await Classes.create(req.body);
    res.status(200).json(newClass);
  } catch (err) {
    res.status(404).json({ error: "Failed to create class" });
  }

//   try{
//     const title = req.body.title;
//     const description = req.body.description;
//     const start = req.body.start;
//     const end = req.body.end;
//     const trainerId = req.body.trainerId;

//     const classes = await Classes.create({
//         title: title,
//         description: description,
//         start: start,
//         end: end,
//         trainerId: trainerId,
//     });

//     res.status(200).json({classes: classes});
// }catch(error){
//     res.status(404).json({message: error.message});

// }
}


export const editClass = async (req, res) =>{
  const { id } = req.params;
  try {
    const updatedClass = await Classes.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ error: "Classes not found" });
    }
    res.status(200).json(updatedClass);
  } catch (error) {
    console.error(err);
    res.status(404).json({ error: "Failed to edit class" });
  }
}

export const deleteClasses = async (req, res) =>{
    
  try {
      const classesId = req.params.id;
      await Classes.deleteOne({ _id: classesId });
      res.status(200).json({ success: "Record deleted" });
  } catch (error) {
      res.status(404).json({ error: "Failed to delete record" });
  }
};