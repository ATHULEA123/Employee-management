const employeeModel = require("../model/employeeModel");

// getdataaaaaaaasssssssssssss

async function getAllEmployees() {
  const employee = await employeeModel.find().sort({ createdAt: -1 });
  return employee;
}

async function createEmployee(newEmployee) {
  try {
    const employee = await employeeModel.create(newEmployee);
    return employee;
  } catch (error) {
    throw new Error("Error Creating Employee");
  }
}
// deleteemployeeeee
async function deleteEmployee(employeeId) {
  console.log(employeeId);
  try {
    const deleteEmployee = await employeeModel.findByIdAndDelete(employeeId);

    if (!deleteEmployee) {
      throw new Error("Employee Not found");
    }
    return deleteEmployee;
  } catch {
    throw new Error("Error in deleting Employee");
  }
}
//updatedDataaaaaaaaaaaaaaaa
async function updateEmployee(employeeId, updatedData) {
  try {
    const updateEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );
    if (!updateEmployee) {
      throw new Error("Employee Not Found");
    }

    return updateEmployee;
  } catch (error) {
    throw new Error("Error updating employee");
  }
}

// get employeeeeeeeeeeeeeebyiddddddddddddddd
async function getEmployeeById(employeeId) {
  const employee = await employeeModel.findById(employeeId);
  if (!employee) {
    throw new Error("Employee Not Found");
  }
  return employee;
  
}
// searchhhh

async function searchEmployees(searchParams) {
  try {
    const pipeline = [
      {
        $match: {
          $and: Object.entries(searchParams).map(([key, value]) => ({
            [key]: { $regex: value, $options: "i" },
          })),
        },
      },
    ];
    const employees = await employeeModel.aggregate(pipeline);
    return employees;
  } catch (error) {
    throw new Error("Error searching employees");
  }
}

module.exports = {
  deleteEmployee,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  searchEmployees,
};
