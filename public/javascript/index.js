// employeeeeeeeee pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

function formopen() {
  const addemployeeform = document.getElementById("employeeform");
  addemployeeform.style.display = "block";
  overlayOn();
}
function formclose() {
  const addemployeeform = document.getElementById("employeeform");
  addemployeeform.style.display = "none";
  overlayOff();
}

function overlayOn() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}
function overlayOff() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

// fetchinggggggggggggggggggggggggdataaaaaaaaaaaaaaaaaaaaaaaaa

// viewData();
// async function viewData() {
//   try {
//     const response = await fetch("http://localhost:5000/api/employees");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log(data);
//     var outputHTML = "";
//     data.forEach((element,index) => {
//       outputHTML += `
//         <tr>
//           <th scope="row">#${index+1}</th>
//           <td><img class="addimage" src="http://localhost:5000/uploads/${element._id}.png" alt="" height="30px" width="30px">${element.salutation}.${element.firstName} ${element.lastName}</td>
//           <td>${element.email}</td>
//           <td>${element.phone}</td>
//           <td>${element.gender}</td>
//           <td>${element.dob}</td>
//           <td>${element.country}</td>
//           <td>
//             <div class="dropdown">
//               <button class="btn btn-secondary dropdown-" type="button"
//                   data-bs-toggle="dropdown" aria-expanded="false">
//                   <i class="fa-solid fa-ellipsis"></i>
//               </button>
//               <ul class="dropdown-menu">
//                   <li><a class="dropdown-item" href="/index2?id=${element._id}" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View Details</a></li>
//                   <li><a class="dropdown-item" href="#" onclick="editformopen('${element._id}')"><i class="fa-solid fa-pencil"></i> Edit</a></li>
//                   <li><a class="dropdown-item" href="#" onclick="dele('${element._id}')"><i class="fa-solid fa-trash"></i> Delete</a></li>
//               </ul>
//             </div>
//           </td>
//         </tr>`;
//     });
//    const tbody = document.getElementById("user-detial-body");
//    tbody.innerHTML = outputHTML;
//   } catch (error) {
//     console.error("Error:", error);
//   }
//  }

var itemsperpage = 5;

var table = [];
formList();
async function formList() {
  try {
    const response = await fetch("http://localhost:5000/api/employees");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    employeinfo = data;
    table = data;

    viewData(1);
    renderpagination();
  } catch (error) {
    console.error("Error:", error);
  }
}

var datacount = document.getElementById("floatingselect");
datacount.addEventListener("change", function () {
  itemsperpage = parseInt(datacount.value);
  formList();
});

var currentpage = 1;
//paginationnnnnnnnnnnnnnnn 1

const totalemployee = document.getElementById("totalemployeee");
//  totalemployee.innerHTML = `of ${employeinfo.length}`;

function viewData(page) {
  const start = (page - 1) * itemsperpage;
  const end = start + itemsperpage;

  const paginatedData = table.slice(start, end);

  let outputHTML = "";

  paginatedData.forEach((element, index) => {
    const id = element._id;

    outputHTML += `  
        <tr>

          <th scope="row"># ${index + start + 1}</th>
          <td><img  class="addimage" src="http://localhost:5000/uploads/${
            element._id
          }.png"
           
           alt="" height = "30px "width = "30px">${element.salutation}.${
      element.firstName
    } ${element.lastName}</td>
          <td>${element.email}</td>
          <td>${element.phone}</td>
          <td>${element.gender}</td>
          <td>${element.dob}</td>
          <td>${element.country}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="index2?id=${
                    element._id
                  }" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View
                          Details</a></li>
                  <li><a class="dropdown-item" href="#" onclick="editformopen('${
                    element._id
                  }')"><i class="fa-solid fa-pencil"></i>
                          Edit</a></li>
                  <li><a class="dropdown-item" href="#" onclick="dele('${
                    element._id
                  }')"><i class="fa-solid fa-trash"></i>
                          Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>`;
    //starting paginationnnnnnnnnnnnnnnnnnnnnnnnnnnnn
  });

  let output = document.querySelector(".table-body");
  output.innerHTML = outputHTML;
  console.log(table);
}
//paginationnnnnnnnnnnnnnnn 1 enddd

function renderpagination() {
  const pagination = document.getElementById("pagination"); //pagination leftclickkkkkk
  pagination.innerHTML = "";

  var doubleclick = document.createElement("li");
  doubleclick.innerHTML =
    '<i class="fa-solid fa-angles-left" style="color: #2B3674";></i>';
  pagination.appendChild(doubleclick);
  doubleclick.addEventListener("click", () => {
    if (currentpage >= 3) {
      currentpage = currentpage - 2;
    } else {
      currentpage;
    }
    viewData(currentpage);
    highlightbtn(currentpage);
  });

  var leftclick = document.createElement("li");
  leftclick.innerHTML =
    '<i class="fa-solid fa-chevron-left" style="color: #2B3674;"></i>';
  pagination.appendChild(leftclick);

  leftclick.addEventListener("click", () => {
    if (currentpage > 1) {
      currentpage--;
    } else {
      currentpage = 1;
    }
    viewData(currentpage);
    highlightbtn(currentpage);
  });

  totalpage = Math.ceil(table.length / itemsperpage); ////////////////////////////////////////////////

  for (let i = 1; i <= totalpage; i++) {
    const pageitem = document.createElement("li");
    pageitem.textContent = i;

    pagination.appendChild(pageitem);

    pageitem.addEventListener("click", () => {
      currentpage = i;

      viewData(currentpage);
      highlightbtn(currentpage);
    });
  }

  var rightclick = document.createElement("li");
  rightclick.innerHTML =
    '<i class="fa-solid fa-angle-right" style="color: #2B3674;"></i>';
  pagination.appendChild(rightclick);

  rightclick.addEventListener("click", () => {
    if (currentpage < totalpage) {
      currentpage++;
    } else {
      currentpage = totalpage;
    }
    viewData(currentpage);
    highlightbtn(currentpage);
  });
  //rightdoubleclck

  var rightdoubleclick = document.createElement("li");
  rightdoubleclick.innerHTML = `<i class="fa-solid fa-angles-right" style="color: #2B3674;"></i>`;
  pagination.appendChild(rightdoubleclick);
  rightdoubleclick.addEventListener("click", () => {
    if (currentpage <= totalpage - 2) {
      currentpage = currentpage + 2;
    } else {
      currentpage;
    }
    viewData(currentpage);
    highlightbtn(currentpage);
  });
  const activebutton = document.getElementById(`page`);
}

renderpagination();
viewData(currentpage);

//pagination buttonnsssssssss colorrr changeeeeeeeeee
function highlightbtn(currentpage) {
  let paginationcontainer = document.getElementById("pagination");
  let button = paginationcontainer.querySelectorAll("li");
  button.forEach((li) => {
    if (parseInt(li.textContent) === currentpage) {
      li.classList.add("selected");
    } else {
      li.classList.remove("selected");
    }
  });
}

// addddddddddemployeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

const form = document.getElementById("postForm");

function add() {
  // e.preventDefault();

  var salutation = document.getElementById("salutation")?.value;
  let firstName = document.getElementById("firstName")?.value;
  var lastName = document.getElementById("lastName")?.value;
  var email = document.getElementById("email")?.value;
  var phone = document.getElementById("phone")?.value;
  var dob = document.getElementById("dob")?.value;
  var address = document.getElementById("address")?.value;
  var country = document.getElementById("country")?.value;
  var state = document.getElementById("state")?.value;
  var city = document.getElementById("city")?.value;
  var qualifications = document.getElementById("qulafi")?.value;
  var pin = document.getElementById("pin")?.value;
  var password = document.getElementById("password")?.value;
  var maleradio = document.getElementById("maleradio");
  username = "jhjhbjb";

  var formatedDate = changeformat(dob);
  function changeformat(dob) {
    dateArr = dob.split("-");
    let date = dateArr[2];
    let mont = dateArr[1];
    let year = dateArr[0];
    const showFormat = date + "-" + mont + "-" + year;
    console.log("updated format is", showFormat);
    return showFormat;
  }

  const newForm = {
    salutation,
    lastName,
    firstName,
    email,
    phone,
    gender: maleradio.checked ? "Male" : "Female",
    address,
    country,
    state,
    city,
    pin,
    qualifications,
    username: firstName + lastName,
    dob: formatedDate,
    password,
  };

  console.log(newForm);

  fetch("http://localhost:5000/api/employees", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newForm),
  })
    .then((resData) => {
      if (!resData.ok) {
        throw new error("errorrr");
      } else {
        formclose();
      }
      return resData.json();
    })

    .then((data) => {
      console.log("success", data);

      //image

      let uploadImg = document.getElementById("exampleInputfile"); //imageee uploaddddddddddd
      const formData = new FormData();
      formData.append("image", uploadImg.files[0]);

      // var user = data;

      fetch(`http://localhost:5000/api/employees/${data._id}/image`, {
        method: "POST",
        body: formData,
      });

      // if(data.ok){

      // newForm.id = data.id;

      // table.unshift(newForm);
      // console.log(table);
      // displayData(1);

      // Swal.fire({
      //   icon:"success",

      //   title: "add employee success",
      //   showconfirmButton:false,
      //   timer:1500,
      // });
      // }
      // else{
      //   console.log("sdfghj");
      // }

      formList();
    });
  // .then(()=>{
  //   Swal.fire({
  //     icon:"success",

  //     title: "add employee success",
  //     showconfirmButton:false,
  //     timer:1500,
  //   });
  // })
}

function addImagecall() {
  var preview = document.getElementById("imginfo");
  preview.src = URL.createObjectURL(event.target.files[0]);
}

// deleteformmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

function deleteFormopen() {
  const deleteemployeeform = document.getElementById("deleteForm");
  deleteemployeeform.style.display = "block";
  overlayOn();
}
function deleteFormclose() {
  const addemployeeform = document.getElementById("deleteForm");
  addemployeeform.style.display = "none";
  overlayOff();
}

// logout
// function logoutOpen(){
//   const logout = document.getElementById("log_out");
//   logout.style.display = "block";
// }

// function dele(id) {
// deleteFormopen()
//   console.log("id is",id);
//           fetch(`http://localhost:5000/api/employees/${id}`,{
//               method:'DELETE',
//           })
//           .then((respone) =>  respone.json())
//           .then(data =>{
//               const deleteRow = document.getElementById(`row-${data._id}`);
//               if(deleteRow){
//                   deleteRow.remove();
//               }
//               // console.log('API Response:',data);
//               viewData()
//               deleteFormclose();
//           })
//           .catch(error =>{
//               console.error('Error:', error);
//           });

//       }

function dele(id) {
  deleteFormopen();

  const del = document.getElementById("conformDelete");
  del.addEventListener("click", async function conformDelete() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      deleteFormclose();

      formList();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  });
}

// logoutt

// document.getElementById("log_out").addEventListener("click", function(event) {
//   event.preventDefault();
//   fetch(" http://localhost:5000/api/employees/logout", {
//     method: "GET",
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json(); // Assuming the server sends a JSON response
//   })
//   .then(data => {
//     // Handle the response data if needed
//     console.log(data);
//     // Redirect to the login page
//     window.location.href = "/login";
//   })
//   .catch(error => {
//     console.error("There was a problem with the fetch operation:", error);
//     // Handle errors or display a message to the user
//   });
// });


// edit formmmmmmmmmmmmmmmmmmmmmmmmmmm

function editformclose() {
  const addemployeeform = document.getElementById("editemployeeform");
  addemployeeform.style.display = "none";
  overlayOff();
}
var editId;
function editformopen(id) {
  const addemployeeform = document.getElementById("editemployeeform");
  addemployeeform.style.display = "block";
  overlayOn();

  editId = id;

  fetch(`http://localhost:5000/api/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())

    .then((data) => {
      console.log("setttt", data);

      const formatedDate = changeformat(data.dob);
      function changeformat() {
        dateArr = data.dob.split("-");
        let date = dateArr[2];
        let mont = dateArr[1];
        let year = dateArr[0];
        const showFormat = date + "-" + mont + "-" + year;
        console.log("updated format is", showFormat);
        return showFormat;
      }

      let changeimg = document.getElementById("changeImg"); //changeeeeeeeeee imgggggggggggggggggg
      changeimg.src = `http://localhost:5000/uploads/${id}.png`;

      document.getElementById("edit-salutation").value = data.salutation;
      document.getElementById("edit-FirstName").value = data.firstName;
      document.getElementById("edit-lastName").value = data.lastName;
      document.getElementById("edit-email").value = data.email;
      document.getElementById("edit-phone").value = data.phone;
      document.getElementById("edit-dob").value = formatedDate;
      document.getElementById("edit-qualifications").value =
        data.qualifications;
      document.getElementById("edit-address").value = data.address;
      document.getElementById("edit-country").value = data.country;
      document.getElementById("edit-state").value = data.state;
      document.getElementById("edit-city").value = data.city;
      document.getElementById("edit-pinzip").value = data.pin;

      const maleradio = document.getElementById("edit-maleradio");
      const femaleradio = document.getElementById("edit-femradio");
      const gender = data.gender;

      if (gender === "Male") {
        console.log(gender);
        maleradio.checked = true;
      } else if (gender === "Female") {
        console.log(gender);
        femaleradio.checked = true;
      }
      console.log(gender);
    });
}

// const saveEdits = document.getElementById("save-btn");
const formedit = document.getElementById("formedit");
// saveEdits.addEventListener("click", (e) => {
//   e.preventDefault();

function employeeedit() {
  var salutation = document.getElementById("edit-salutation");
  var firstName = document.getElementById("edit-FirstName");
  var lastName = document.getElementById("edit-lastName");
  var email = document.getElementById("edit-email");
  var phone = document.getElementById("edit-phone");
  var dob = document.getElementById("edit-dob").value;
  var address = document.getElementById("edit-address");
  var city = document.getElementById("edit-city");
  var state = document.getElementById("edit-state");
  var country = document.getElementById("edit-country");
  var pin = document.getElementById("edit-pinzip");
  var qualifications = document.getElementById("edit-qualifications");
  // var password = document.getElementById("edit-password");
  var editmaleradio = document.getElementById("edit-maleradio");
  var editfemradio = document.getElementById("edit-femradio");

  var formatedDate = changeformat(dob);
  function changeformat(dob) {
    dateArr = dob.split("-");
    let date = dateArr[2];
    let mont = dateArr[1];
    let year = dateArr[0];
    const showFormat = date + "-" + mont + "-" + year;
    console.log("updated format is", showFormat);
    return showFormat;
  }

  console.log("hello");
  var saveDetails = {
    salutation: salutation.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    dob: formatedDate,
    address: address.value,
    city: city.value,
    state: state.value,
    country: country.value,
    qualifications: qualifications.value,
    username: firstName + email,
    pin: pin.value,
    password: dob + lastName,
    gender: editmaleradio.checked ? "Male" : "Female",
  };
  console.log("data", saveDetails);

  const newId = editId;

  fetch(`http://localhost:5000/api/employees/${newId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(saveDetails),
  });
  formList();
  editformclose();

  let editImg = document.getElementById("exampleInputfile"); //editttttttttt imgeeeeeeeeeeeeeeeeeeeeeeee
  const editData = new FormData();
  editData.append("image", editImg.files[0]);

  return fetch(`http://localhost:5000/api/employees/${newId}/image`, {
    method: "POST",
    body: editData,
  });
}
document
  .getElementById("exampleInputfile")
  .addEventListener("change", function (event) {
    const input = event.target;
    const preview = document.getElementById("changeImg");

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  });

// addemployeeeform validationnnnnnnnnnnnnnnnnnnnnnnnnn

const errorMsg = document.getElementsByClassName("errorMsg");
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateInput(salutation, 0, "Select Salutation");
  validateInput(firstName, 1, "Enter first name");
  validateInput(lastName, 2, "Enter last name");
  validateInput(email, 3, "Enter Email");
  validateInput(phone, 4, "Enter Mobile Number");
  validateInput(dob, 5, "Enter Date of Birth");
  validateGender();
  validateInput(qulafi, 7, "Enter Qualification");
  validateInput(password, 8, "Enter password");
  validateInput(address, 9, "Enter Address");
  validateInput(country, 10, "Select country");
  validateInput(state, 11, "Select State");
  validateInput(city, 12, "Enter City");
  // validateInput(pin, 12, "Enter Pin/Zip");
  // add()
});

const validateInput = (input, serial, msg) => {
  if (input.value.trim() === "") {
    errorMsg[serial].innerHTML = msg;
  } else {
    errorMsg[serial].innerHTML = "";
  }
};

const validateGender = () => {
  if (!maleradio.checked && !femradio.checked) {
    errorMsg[6].innerHTML = "Select gender";
  } else {
    errorMsg[6].innerHTML = "";
  }
};

// Add event listeners for input fields in the edit form
salutation.addEventListener("input", () => removeValidationErrors(0));
firstName.addEventListener("input", () => removeValidationErrors(1));
lastName.addEventListener("input", () => removeValidationErrors(2));
email.addEventListener("input", () => removeValidationErrors(3));
phone.addEventListener("input", () => removeValidationErrors(4));
dob.addEventListener("input", () => removeValidationErrors(5));
qulafi.addEventListener("input", () => removeValidationErrors(7));
password.addEventListener("input", () => removeValidationErrors(8));
address.addEventListener("input", () => removeValidationErrors(9));
country.addEventListener("input", () => removeValidationErrors(10));
state.addEventListener("input", () => removeValidationErrors(11));
city.addEventListener("input", () => removeValidationErrors(12));
// pinEdit.addEventListener("input", () => removeValidationErrors(12));

function removeValidationErrors(serial) {
  const errorMsgs = document.querySelectorAll(".errorMsg");
  errorMsgs[serial].innerHTML = " ";
}

// searchdata  paginationnnnnnnnnnnnnnnnnnn

// Assuming you have a search input field with id "searchInput"
const searchInput = document.getElementById("searchInput");

// Function to fetch data from the backend using GET request
async function fetchData(searchParams) {
  try {
    const queryString = new URLSearchParams(searchParams).toString();
    const response = await fetch(
      `http://localhost:5000/api/employees/search?${queryString}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to handle search input change event
searchInput.addEventListener("input", async () => {
  const searchValue = searchInput.value.trim();
  const searchParams = { firstName: searchValue }; // Modify as needed
  const data = await fetchData(searchParams);
  if (data) {
    // Update UI with fetched data
    console.log(data);
    const tableBody = document.getElementById("user-detial-body");

    tableBody.innerHTML = "";

    data.forEach((element, i) => {
      id = element._id;
      const row = document.createElement("tr");
      row.innerHTML = `  
            <tr>
    
            <th scope="row">#${i + 1}</th>
              <td><img  class="addimage" src="http://localhost:5000/uploads/${
                element._id
              }.png"
               
               alt="" height = "30px "width = "30px">${element.salutation}.${
        element.firstName
      } ${element.lastName}</td>
              <td>${element.email}</td>
              <td>${element.phone}</td>
              <td>${element.gender}</td>
              <td>${element.dob}</td>
              <td>${element.country}</td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis"></i>
                  </button>
                  <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="index2.html?id=${
                        element.id
                      }" onclick="viewDetial"><i class="fa-regular fa-eye"></i> View
                              Details</a></li>
                      <li><a class="dropdown-item" href="#" onclick="editformopen('${
                        element.id
                      }')"><i class="fa-solid fa-pencil"></i>
                              Edit</a></li>
                      <li><a class="dropdown-item" href="#" onclick="dele('${id}')"><i class="fa-solid fa-trash"></i>
                              Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>`;
      tableBody.appendChild(row);
    });
  }

  searchInput.addEventListener("input", handleSearchInput);

  function handleSearchInput() {
    const searchTerm = searchInput.value;
    if (searchTerm === "") {
      window.location.href = "http://localhost:5000";
    }
  }
  // Update your UI logic here
});
