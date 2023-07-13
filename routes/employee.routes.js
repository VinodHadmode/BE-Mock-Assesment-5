const express = require("express")
const { auth } = require("../middlewares/auth.middleware")
const { EmployeeModel } = require("../models/employee.model")

const employeeRouter = express.Router()

employeeRouter.post("/addEmployees", auth, async (req, res) => {
    const { first_name, last_name, email, department, salary } = req.body
    try {
        const employee = new EmployeeModel(req.body)
        await employee.save()
        res.status(200).json({ msg: "New employee has been added" })

    } catch (error) {
        res.status(400).json({ err: error })
    }
})

employeeRouter.get("/", auth, async (req, res) => {
    const {department,salary}=req.params
    try {
        const employee = await EmployeeModel.find({ userID: req.body.userID })
        res.status(200).json(employee)
    } catch (error) {
        res.status(400).json({ err: error })
    }
})

employeeRouter.patch("/edit/:eID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const employeeID = req.params.eID
    // console.log(userIDinUserDoc,employeeID);
    try {
        const employee = await EmployeeModel.findOne({ _id: employeeID })
        userIDinEmployeeDoc = employee.userID
        // console.log(userIDinUserDoc, userIDinEmployeeDoc);
        if (userIDinUserDoc == userIDinEmployeeDoc) {
            await EmployeeModel.findByIdAndUpdate({ _id: employeeID })
            res.status(200).json({ msg: `Employee with name ${employee.first_name} details updated` })
        } else {
            res.status(200).json({ msg: "Not Authorised" })
        }
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
})

employeeRouter.delete("/delete/:eID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const employeeID = req.params.eID
    // console.log(userIDinUserDoc,employeeID);
    try {
        const employee = await EmployeeModel.findOne({ _id: employeeID })
        userIDinEmployeeDoc = employee.userID
        // console.log(userIDinUserDoc, userIDinEmployeeDoc);
        if (userIDinUserDoc == userIDinEmployeeDoc) {
            await EmployeeModel.findByIdAndDelete({ _id: employeeID })
            res.status(200).json({ msg: `Employee with name ${employee.first_name} deleted` })
        } else {
            res.status(200).json({ msg: "Not Authorised" })
        }
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
})

module.exports = {
    employeeRouter
}