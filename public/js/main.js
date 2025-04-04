
//Password Show icon
let password = document.getElementById('exampleInputPassword1');
let eyeIcon = document.getElementById('eye-icon');

if(password && eyeIcon){
   function showPassword() {
      password.type = password.type == 'password' ? 'text' : 'password';
   
      eyeIcon.classList.toggle('fa-eye');
      eyeIcon.classList.toggle('fa-eye-slash');
   };
   eyeIcon.addEventListener('click', showPassword);
   
};


//Delete user

function deleteUser(id) {
   if(confirm("Are you sure ?")){
      $.ajax({
         url : '/admin/delete',
         data: {id},
         method : 'post',
         success : (res) => {
            location.reload();
         }
      })
   }
};

//edit user
function updateUser(id) {
  window.location.href = `/admin/edit?id=${id}`;
};

//add-Button
let addButton = document.getElementById('add-button');
if(addButton){
   addButton.addEventListener('click', () => window.location.href = '/admin/add-user');
}

//singnup name number prevention
let numberInput = document.querySelectorAll('.name-field');

numberInput.forEach(input => {
   
   input.addEventListener('keydown', (e) => {
      if(e.key >= '0' && e.key <= '9'){
         e.preventDefault();
      }
   });
});

//ChangePassword
let checkBox = document.getElementById('changePassword');
if(checkBox){
   function changePassword() {
      let password = document.getElementById('form3Example4');
      password.disabled = !checkBox.checked;
   }
   
   checkBox.addEventListener('click', changePassword);
}

//search user
document.getElementById("searchInput").addEventListener("keyup", function () {
   let value = this.value.toLowerCase();
   let rows = document.querySelectorAll("tbody tr");

   rows.forEach(row => {
       let name = row.children[1].innerText.toLowerCase();
       let email = row.children[2].innerText.toLowerCase();
       row.style.display = (name.includes(value) || email.includes(value)) ? "" : "none";
   });
});

//pagination
document.addEventListener("DOMContentLoaded", function () {
   const rowsPerPage = 5; // Number of users per page
   let currentPage = 1;

   const usersTableBody = document.querySelector("tbody");
   const users = [...usersTableBody.querySelectorAll("tr")];
   const paginationContainer = document.createElement("div");

   paginationContainer.classList.add("d-flex", "justify-content-center", "mt-3");
   document.querySelector(".table").appendChild(paginationContainer);

   function displayPage(page) {
       const start = (page - 1) * rowsPerPage;
       const end = start + rowsPerPage;

       users.forEach((row, index) => {
           row.style.display = index >= start && index < end ? "table-row" : "none";
       });

       updatePagination();
   }

   function updatePagination() {
       paginationContainer.innerHTML = "";
       const totalPages = Math.ceil(users.length / rowsPerPage);

       for (let i = 1; i <= totalPages; i++) {
           const btn = document.createElement("button");
           btn.textContent = i;
           btn.classList.add("btn", "btn-outline-light", "mx-1");
           if (i === currentPage) btn.classList.add("btn-primary");

           btn.addEventListener("click", function () {
               currentPage = i;
               displayPage(currentPage);
           });

           paginationContainer.appendChild(btn);
       }
   }

   displayPage(currentPage);
});
