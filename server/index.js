import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import Plan from "./models/Plan.js";
import PlanStat from "./models/PlanStat.js";
import {dataPlan, dataPlanStat} from "./data/index.js";


// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//const Plan = require('./models/Plan.js');

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

app.post("/plans", async (req, res) => {
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

    res.json({plan: plan});

});

app.put("/plans/:id", async (req, res) => {
    const planId = req.params.id;

    const {name, price, description, category} = req.body;

    await Plan.findByIdAndUpdate(planId, {
        name,
        price,
        description,
        category,
    });

    const plan = await Plan.findById(planId);

    res.json({plan});

});

app.get("/plans/:id", async (req, res) =>{
    const planId = req.params.id;

    const plan = await Plan.findById(planId);

    res.json({plan: plan});
});


app.delete("/plans/:id", async (req, res) =>{
    const planId = req.params.id;
    try {
        await Plan.deleteOne({ _id: planId });
        res.json({ success: "Record deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete record" });
    }
});


// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    //might not need this
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //add once to the db
    //Plan.insertMany(dataPlan);
    //PlanStat.insertMany(dataPlanStat);
})
.catch((error) => console.log(`${error} did not connect`));