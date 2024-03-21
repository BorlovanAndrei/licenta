import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

async function requireAuth(req, res, next) {
    try {
      const token = req.cookies.Authorization;
  
      const decoded = jwt.verify(token, process.env.SECRET);
  
      if (Date.now() > decoded.exp) return res.sendStatus(401);
  
      const admin = await Admin.findById(decoded.sub);
      if (!admin) return res.sendStatus(401);
  
      req.admin = admin;
  
      next();
    } catch (err) {
      return res.sendStatus(401);
    }
  }
  
export default requireAuth;
