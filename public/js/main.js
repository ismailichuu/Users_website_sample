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
