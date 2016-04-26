var allImages = [];
var totalClicks = 25;
var productNames = [];
var timesClicked = [];
var timesDisplayed = [];

var leftBox = document.getElementById('left-box');
var middleBox = document.getElementById('middle-box');
var rightBox = document.getElementById('right-box');
var buttonOne = document.getElementById('button-one');
var buttonTwo = document.getElementById('button-two');

//Constructor function to create object for each img
function Product(productName, filepath){
  this.productName = productName;
  this.filepath = filepath;
  this.clicks = 0;
  this.displays = 0;
}

//Generates a random number < the length of the allImages array
function getIndex() {
  return Math.floor(Math.random() * allImages.length);
}

//Randomly display 3 images from allImages array
function getImages() {
  var xImg = allImages[getIndex()];
  leftBox.innerHTML = '<img src="' + xImg.filepath + '" id="' + xImg.productName + '">';
  xImg.displays += 1;

// #2 img same as above with a while statement, re-randomizes if 2nd image = 1st
  var yImg = allImages[getIndex()];
  while (yImg === xImg){
    yImg = allImages[getIndex()];
  }
  middleBox.innerHTML = '<img src="' + yImg.filepath + '" id="' + yImg.productName + '">';
  yImg.displays += 1;

//#3 img same as above with a while statement, re-randomizes if 3rd image = 1st or 2nd
  var zImg = allImages[getIndex()];
  while (zImg === xImg || zImg === yImg){
    zImg = allImages[getIndex()];
  }
  rightBox.innerHTML = '<img src="' + zImg.filepath + '" id="' + zImg.productName + '">';
  zImg.displays += 1;
}

//Dumps images that were already on-screen
function clearImages(){
  leftBox.innerHTML = '';
  middleBox.innerHTML = '';
  rightBox.innerHTML = '';
}

//On-click event to reset images
function addClick(event) {
  for (var i = 0; i < allImages.length; i ++){
    if (event.target.id === allImages[i].productName){
      allImages[i].clicks += 1;
    }
  }
  totalClicks -= 1;
  if(totalClicks === 0){
    showButtons();
    leftBox.removeEventListener('click', addClick);
    middleBox.removeEventListener('click', addClick);
    rightBox.removeEventListener('click', addClick);
  } else{
    clearImages();
    getImages();
  }
}

function showButtons(){
  document.getElementById('button-one').style.visibility = 'visible';
  document.getElementById('button-two').style.visibility = 'visible';
}

function hideButtons(){
  document.getElementById('button-one').style.visibility = 'hidden';
  document.getElementById('button-two').style.visibility = 'hidden';
}

//Allows user to make 10 more selections
function tenMore(){
  hideButtons();
  totalClicks = 11;
  getImages();
  leftBox.addEventListener('click', addClick);
  middleBox.addEventListener('click', addClick);
  rightBox.addEventListener('click', addClick);
}

//chart--------------------------------------------------------------
function populateDataArrays(){
  for (var i = 0; i < allImages.length; i++){
    productNames.push(allImages[i].productName);
    timesClicked.push(allImages[i].clicks);
    timesDisplayed.push(allImages[i].displays);
  }
}

function showGraph (){
  productNames = [];
  timesClicked = [];
  timesDisplayed = [];
  populateDataArrays();
  var contextTest = document.getElementById('results');
  results.innerHTML = '<canvas id="selection-chart" width="932" height="300"></canvas>';
  var context = document.getElementById('selection-chart').getContext('2d');
  var selectionChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Times Selected',
        backgroundColor: '#d44c1d',
        data: timesClicked,
      }, {
        label: 'Times Displayed',
        backgroundColor: '#842f12',
        data: timesDisplayed,
      }]
    },
    options:{
      responsive:false,
      scales:{
        yAxes:[{
          ticks:{
            beginAtZero:true,
            stepSize: 1,
          }
        }]
      }
    }
  });
}

//Adds each product
allImages.push(new Product('R2-D2', 'img/bag.jpg'));
allImages.push(new Product('Banana', 'img/banana.jpg'));
allImages.push(new Product('Bathroom', 'img/bathroom.jpg'));
allImages.push(new Product('Boots', 'img/boots.jpg'));
allImages.push(new Product('Breakfast', 'img/breakfast.jpg'));
allImages.push(new Product('Bubblegum', 'img/bubblegum.jpg'));
allImages.push(new Product('Chair', 'img/chair.jpg'));
allImages.push(new Product('Cthulhu', 'img/cthulhu.jpg'));
allImages.push(new Product('Dog Duck', 'img/dog-duck.jpg'));
allImages.push(new Product('Dragon', 'img/dragon.jpg'));
allImages.push(new Product('Pen', 'img/pen.jpg'));
allImages.push(new Product('Pet Sweep', 'img/pet-sweep.jpg'));
allImages.push(new Product('Scissors', 'img/scissors.jpg'));
allImages.push(new Product('Shark', 'img/shark.jpg'));
allImages.push(new Product('Sweep', 'img/sweep.jpg'));
allImages.push(new Product('Tauntaun', 'img/tauntaun.jpg'));
allImages.push(new Product('Unicorn', 'img/unicorn.jpg'));
allImages.push(new Product('Usb', 'img/usb.jpg'));
allImages.push(new Product('Water Can', 'img/water-can.jpg'));
allImages.push(new Product('Wine Glass', 'img/wine-glass.jpg'));

//add event listener to the three images
leftBox.addEventListener('click', addClick);
middleBox.addEventListener('click', addClick);
rightBox.addEventListener('click', addClick);
buttonOne.addEventListener('click', tenMore);
buttonTwo.addEventListener('click', showGraph);

getImages();
