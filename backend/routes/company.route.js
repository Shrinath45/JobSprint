import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { deleteCompany } from "../controllers/company.controller.js";
import { logoUpload, multiUpload, singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,logoUpload, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);


export default router;

