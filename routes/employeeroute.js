const express = require("express");
const router = express.Router();
const {
  getDatas,
  postData,
  putData,
  deleteEmployee,
  getData,
  postimg,
  searchEmployees,
} = require("../controller/employeecontroller");
const upload = require("../config/multer");
// const validateToken = require("../middleware/validateToken");

// router.use(validateToken);
router.route("/").get(getDatas);
router.route("/").post(postData);
router.post("/:id/image", upload.single("image"), postimg);

router.route("/:id").put(putData);
router.route("/search").get(searchEmployees);
router.route("/:id").delete(deleteEmployee);

router.route("/:id").get(getData);

module.exports = router;
