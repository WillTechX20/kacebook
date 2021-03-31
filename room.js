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
var newChatMessageTextInput=document.querySelector('.new_chat_message');

userGreetingDiv.innerText='Welcome, '+localStorage.getItem('currentUsernameStr')+'!';

function logout(){
    localStorage.removeItem('currentUsernameStr');
    location='index.html';
}

firebase.database().ref('/'+localStorage.getItem('currentRoomNameStr')).on('value', function(snapshots){
    snapshots.forEach(function(snapshot){
        var fullMessageStr=snapshot.val().fullMessage;

        if(!(snapshot.key=='purpose')){
            var newChatMessageP=document.createElement('p');
            var newChatMessageLikesP=document.createElement('p');
    
            newChatMessageP.innerText=fullMessageStr;
            newChatMessageP.className='chat_message';
            newChatMessageP.dataset.likes=0;
            newChatMessageLikesP.innerText='Likes: 0';
            newChatMessageP.onclick=function(){
                this.dataset.likes=parseInt(this.dataset.likes)+1;
                this.nextSibling.innerText='Likes: '+this.dataset.likes;
            };
            document.querySelector('section').appendChild(newChatMessageP);
            document.querySelector('section').appendChild(newChatMessageLikesP); 
        }   
    });
});

function sendNewChatMessage(){
    var newChatMessageStr=newChatMessageTextInput.value;
    
    newChatMessageTextInput.value='';
    firebase.database().ref('/'+localStorage.getItem('currentRoomNameStr')).child(localStorage.getItem('currentUsernameStr')).update({fullMessage: localStorage.getItem('currentUsernameStr')+': '+newChatMessageStr});
}

document.querySelector('section').innerHTML='';