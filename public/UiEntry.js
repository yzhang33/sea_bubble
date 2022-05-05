
//var img = document.getElementById('bkj'); 

let wHeight = window.innerWidth;
let wWidth = window.innerHeight;

let canvas = document.querySelector('#game-canvas');
let ctx = canvas.getContext('2d');
canvas.width = wHeight;
canvas.height = wWidth;
//board variables
let user={}
let users=[]
let bullets = []

console.log(wHeight +" "+wWidth);
$(window).load(()=>{
    $('#loginModal').modal('show');  
})

$('.name-form').submit((event)=>{
    event.preventDefault()
    user.name = document.querySelector('#name-input').value;
    $('#loginModal').modal('hide');
    //start board when clicked submit
    $('.hiddenOnStart').removeAttr('hidden');
    //init called from socketUtil
    init();
})

