var firebaseConfig={
    apiKey: "AIzaSyBrfOLKaLZLUVJ7QsT_P4Lx0ePyyGWC-wM",
    authDomain: "kacebook-database.firebaseapp.com",
    databaseURL: "https://kacebook-database-default-rtdb.firebaseio.com",
    projectId: "kacebook-database",
    storageBucket: "kacebook-database.appspot.com",
    messagingSenderId: "811405286826",
    appId: "1:811405286826:web:bd3afa9af968016eba5fd3"
};

firebase.initializeApp(firebaseConfig);

var userGreetingDiv=document.querySelector('.user_greeting');
var newRoomNameTextInput=document.querySelector('.new_room_name');
var roomNameStrs=[];

userGreetingDiv.innerText='Welcome, '+localStorage.getItem('currentUsernameStr')+'!';

function logout(){
    localStorage.removeItem('currentUsernameStr');
    location='index.html';
}

function addRoom(){
    var newRoomNameStr=newRoomNameTextInput.value;
    roomNameStrs.push(newRoomNameStr);
    firebase.database().ref('/').child(newRoomNameStr).update({purpose: 'Adding new room!'});
}

function joinRoom(){
    if(roomNameStrs.includes(newRoomNameTextInput.value)){
        localStorage.setItem('currentRoomNameStr', newRoomNameTextInput.value);
        location='room.html';
    }else{
        alert('That room does not exsist! Try adding a new room or join a different one!');
    }
}
