var allImages = [];
var theEnd = false;
var sum = 3;

// Constructor function to create object for each img

function product(productName, filepath){
  this.productName = productName;
  this.filepath = filepath;
  this.clicks = 0;
  this.displays = 0;
}

allImages.push(new product('R2-D2', 'img/bag.jpg'));
allImages.push(new product('Banana', 'img/banana.jpg'));
allImages.push(new product('Bathroom', 'img/bathroom.jpg'));
allImages.push(new product('Boots', 'img/boots.jpg'));
allImages.push(new product('Breakfast', 'img/breakfast.jpg'));
allImages.push(new product('Bubblegum', 'img/bubblegum.jpg'));
allImages.push(new product('Chair', 'img/chair.jpg'));
allImages.push(new product('Cthulhu', 'img/cthulhu.jpg'));
allImages.push(new product('Dog Duck', 'img/dog-duck.jpg'));
allImages.push(new product('Dragon', 'img/dragon.jpg'));
allImages.push(new product('Pen', 'img/pen.jpg'));
allImages.push(new product('Pet Sweep', 'img/pet-sweep.jpg'));
allImages.push(new product('Scissors', 'img/scissors.jpg'));
allImages.push(new product('Shark', 'img/shark.jpg'));
allImages.push(new product('Sweep', 'img/sweep.jpg'));
allImages.push(new product('Tauntaun', 'img/tauntaun.jpg'));
allImages.push(new product('Unicorn', 'img/unicorn.jpg'));
allImages.push(new product('Usb', 'img/usb.jpg'));
allImages.push(new product('Water Can', 'img/water-can.jpg'));
allImages.push(new product('Wine Glass', 'img/wine-glass.jpg'));

//establish variable for each of the 3 divs that will hold images
var leftBox = document.getElementById('left-box');
var middleBox = document.getElementById('middle-box');
var rightBox = document.getElementById('right-box');

//function to randomly display 3 images from allImages array
function getImages() {
  //randomly selects an image from the array
  var xImg = allImages[Math.floor(Math.random() * allImages.length)];
  xImg.src = xImg.filepath;
//appends what we created to where we specified
  leftBox.innerHTML = '<img src="' + xImg.filepath + '">';
  xImg.displays += 1;

// #2 same as above with an if statement, re-randomizes if 2nd image = 1st
  var yImg = allImages[Math.floor(Math.random() * allImages.length)];
  yImg.src = yImg.filepath;
  while (yImg.src === xImg.src){
    yImg = allImages[Math.floor(Math.random() * allImages.length)];
  }
  middleBox.innerHTML = '<img src="' + yImg.filepath + '">';
  yImg.displays += 1;

//#3 same as above with an if statement, re-randomizes if 3rd image = 1st or 2nd
  var zImg = allImages[Math.floor(Math.random() * allImages.length)];
  zImg.src = zImg.filepath;
  while (zImg.src === xImg.src || zImg.src === yImg.src){
    zImg = allImages[Math.floor(Math.random() * allImages.length)];
  }
  rightBox.innerHTML = '<img src="' + zImg.filepath + '">';
  zImg.displays += 1;
}

function addClick(event) {
  // console.log(event.target.src);
  if (event.target.src === allImages.filepath);
  sum -= 1;
  lookForEnd();
  clearImages();
  getImages();
}

function clearImages(){
  var allImages = document.getElementById('all-images');
  leftBox.innerHTML = '';
  middleBox.innerHTML = '';
  rightBox.innerHTML = '';
}

//add event listener to each variable
leftBox.addEventListener('click', addClick);
middleBox.addEventListener('click', addClick);
rightBox.addEventListener('click', addClick);

//when total clicks in allImages = 25, display 2 buttons

function sumClicks(){
  for (sum = 25; sum = allImages.length; sum --){
    allImages[sum].clicks += 1;
  }
}

function lookForEnd(){
  if (sum === 0){
    theEnd = true;
  }
}

function showButtons(){
  if(theEnd === true){
    var buttonOne = createElement('buttonOne');
    buttonOne.innerhtml = '<a>Do Ten More!</a>';
    location.appendChild('buttoneOne');
    var buttonTwo = createElement('buttonTwo');
    buttonTwo.innerhtml = '<a>Show Results!</a>';
    location.appendChild('buttonTwo');
  }
}
// buttonOne.addEventListener('click', tenMore);
// buttonTwo.addEventListener('click', showResults);

function tenMore(){
  sum = 10;
  getImages();
}

function showResults(){
  var ul = createElement('ul');
  ul.textContent = 'Here are the results!';
  location.appendChild(ul);
}

getImages();
