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
var results = document.getElementById('results');

//Constructor function to create object for each img
function Product(productName, filepath){
  this.productName = productName;
  this.filepath = filepath;
  this.clicks = 0;
  this.displays = 0;
  allImages.push(this);
}

//Generates a random number < the length of the allImages array
function getRandomIndex() {
  return Math.floor(Math.random() * allImages.length);
}

//Randomly display 3 images from allImages array
function getImages() {
  var xImg = allImages[getRandomIndex()];
  leftBox.innerHTML = '<img src="' + xImg.filepath + '" id="' + xImg.productName + '">';
  xImg.displays += 1;

//#2 img same as above with a while statement, re-randomizes if 2nd image = 1st
  var yImg = allImages[getRandomIndex()];
  while (yImg === xImg){
    yImg = allImages[getRandomIndex()];
  }
  middleBox.innerHTML = '<img src="' + yImg.filepath + '" id="' + yImg.productName + '">';
  yImg.displays += 1;

//#3 img same as above, re-randomizes if 3rd image = 1st or 2nd
  var zImg = allImages[getRandomIndex()];
  while (zImg === xImg || zImg === yImg){
    zImg = allImages[getRandomIndex()];
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

//On-click event to collect new images
function handleClick(event) {
  for (var i = 0; i < allImages.length; i ++){
    if (event.target.id === allImages[i].productName){
      allImages[i].clicks += 1;
      localStorage.setItem('clicks', JSON.stringify(allImages));
    }
  }
  totalClicks -= 1;
  if(totalClicks === 0){
    showButtons();
    leftBox.removeEventListener('click', handleClick);
    middleBox.removeEventListener('click', handleClick);
    rightBox.removeEventListener('click', handleClick);
  } else{
    clearImages();
    getImages();
  }
}

function showButtons(){
  document.getElementById('button-one').style.visibility = 'visible';
  document.getElementById('button-two').style.visibility = 'visible';
  document.getElementById('clear-local').style.visibility = 'visible';

}

function hideButtons(){
  document.getElementById('button-one').style.visibility = 'hidden';
  document.getElementById('button-two').style.visibility = 'hidden';
  document.getElementById('clear-local').style.visibility = 'hidden';
}

//Allows user to make 10 more selections
function handleTenMore(){
  hideButtons();
  totalClicks = 11;
  getImages();
  leftBox.addEventListener('click', handleClick);
  middleBox.addEventListener('click', handleClick);
  rightBox.addEventListener('click', handleClick);
}

//chart--------------------------------------------------------------
function populateDataArrays(){
  for (var i = 0; i < allImages.length; i++){
    productNames.push(allImages[i].productName);
    timesClicked.push(allImages[i].clicks);
    timesDisplayed.push(allImages[i].displays);
  }
}

function handleDisplayGraph (){
  productNames = [];
  timesClicked = [];
  timesDisplayed = [];
  populateDataArrays();
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
new Product('R2-D2', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.jpg');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('Usb', 'img/usb.jpg');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

//add event listener to the three images
leftBox.addEventListener('click', handleClick);
middleBox.addEventListener('click', handleClick);
rightBox.addEventListener('click', handleClick);
buttonOne.addEventListener('click', handleTenMore);
buttonTwo.addEventListener('click', handleDisplayGraph);
document.getElementById('clear-local').addEventListener('click', function(){
  localStorage.clear();
});

getImages();

(function checkLocal(){
  var parsedData = JSON.parse(localStorage.clicks);
  allImages = parsedData;
})();
