var signUpForm=document.querySelector('form');

signUpForm.addEventListener('submit', eventVar=>{
    eventVar.preventDefault();

    var signUpFormData=new FormData(signUpForm);
    var newUsernameStr=signUpFormData.get('username');

    localStorage.setItem('currentUsernameStr', newUsernameStr);
    location='join_room.html';
});