const asyncHandler = require("express-async-handler");

const employee = require("../model/employeeModel");
const employeeService = require("../service/employeeservice");
// const multer = require("multer")
const upload = require("../config/multer");
const path = require("path");
const fs = require("fs");
//get DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

const getDatas = asyncHandler(async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//POST DATAAAAAAAAAAAAAAAAAA

const postData = asyncHandler(async (req, res) => {
  const {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    dob,
    gender,
    qualifications,
    address,
    country,
    state,
    city,
    pin,
  } = req.body;
  if (
    !salutation ||
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !username ||
    !password ||
    !dob ||
    !gender ||
    !qualifications ||
    !address ||
    !country ||
    !state ||
    !city ||
    !pin
  ) {
    console.log(req.body);
    res.status(404);
    throw new Error("all fields are mandatory");
  }
  const employees = await employee.create({
    salutation,
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
    dob,
    gender,
    qualifications,
    address,
    country,
    state,
    city,
    pin,
    
  });
  res.status(201).json(employees);
});

//image//
const postimg = async (req, res) => {
  console.log("Received file:", req.file);
  console.log("Request params:", req.params);
  if (req.file) {
    const imgPath = `public/uploads/${req.file.filename}`;
    console.log("kijk", imgPath);
    await employee.findByIdAndUpdate(req.params.id, { image: imgPath });
    res
      .status(200)
      .json({ message: "Image uploaded successfully..............." });
  } else {
    console.log("No file uploaded");
    res.status(400).json({ message: "Failed to upload image..............." });
  }
};

// UPDATE DATAAAAAAAAAAAAAAAA

const putData = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;
    const existingEmployee = await employee.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update only if a new file upload
    const updatedData = {
      ...req.body,
      // ...(req.file ? { image: path.join("upload", req.file.filename) } : {}),
    };

    const updatedEmployee = await employeeService.updateEmployee(
      employeeId,
      updatedData
    );
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE DATAAAAAAAAAAAAAAAAAAAAAAAA

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await employeeService.deleteEmployee(employeeId);

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      `${employeeId}.png`
    );
    if (fs.existsSync(imagePath)) {
      // If the image file exists, delete it
      fs.unlinkSync(imagePath);
    }

    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// GET DATAAAAAA BY IDDDDDDDDDDDDDD

const getData = asyncHandler(async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeService.getEmployeeById(employeeId);
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @author
 * @description
 * @param
 */
const searchEmployees = asyncHandler(async (req, res) => {
  try {
    const searchParams = req.query; // Assuming search parameters are in the query string
    const employees = await employeeService.searchEmployees(searchParams);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// paginationnnn

module.exports = {
  getDatas,
  postData,
  putData,
  deleteEmployee,
  getData,
  postimg,
  searchEmployees,
};
