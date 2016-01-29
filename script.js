// PRELOADER
////////////////////////////////////////////////////////////////////////////////

// Original from: http://www.techrepublic.com/article/preloading-and-the-javascript-image-object/
function preloader() 

{
     // counter
     var i = 0;


     // create object
     var imageObj = new Image();


     // set image list
     var images = [];
     images[0]="LarryChen.jpg"
     images[1]="photos/JonathanSautter.jpg"
     // images[2]="image3.jpg"
     // images[3]="image4.jpg"


     // start preloading
     for(i=0; i<=3; i++) 
     {
          imageObj.src=images[i];
     }
} 


// SETTINGS
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Colors
const BACKGROUND_COLOR_ORIGIN = 'rgba(0, 1, 8, 0.88)';

// Sizes
const IMAGE_CONTAINER_HEIGHT_AS_PERCENT_OF_WRAPPER_SIZE = 60;
const IMAGE_CONTAINER_WIDTH_AS_PERCENT_OF_WRAPPER_SIZE = 100;


// POSITIONS
const IMAGE_CONTAINER_POSITION_PERCENT_FROM_TOP_OF_WRAPPER = 20;
const IMAGE_CONTAINER_POSITION_PERCENT_FROM_LEFT_OF_WRAPPER = 0;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



function sizeElements () {
    var viewPort = $(window),
        screenWidth = viewPort.width(),
        screenHeight = viewPort.height(),
        smallestSize;
    
    if (screenWidth > screenHeight) {
        smallestSize = screenHeight;
    } else {
        smallestSize = screenWidth;
    }    

    // Step 1: Resize Wrapper
    resizeWrapperDiv(screenWidth, screenHeight, smallestSize);

    // Step 2: Resize Image Container
    resizeImageContainerWithinWrapper();
    
    // Step 3: Resize Signature Box
    resizeSignatureBox();
    
    // Step 4: Change Background Color
    setBackgroundCSS();
}

function resizeWrapperDiv (screemWidth, screenHeight, smallestLengthOrHeight) {
  var distanceFromTop = (screenHeight - smallestLengthOrHeight) / 2;
  var distanceFromLeft = (screemWidth - smallestLengthOrHeight) / 2;
    
  $('#fullWrapper').height(smallestLengthOrHeight);
  $('#fullWrapper').width(smallestLengthOrHeight);
  $('#fullWrapper').css({
    top: distanceFromTop,
    left: distanceFromLeft,
  });
  
}

function resizeImageContainerWithinWrapper () {
  var imageContainer = $('#imageContainer'),
      wrapper = imageContainer.parent(),
      parentHeight = wrapper.height(),
      parentWidth = wrapper.width(),
      imageContainerHeight = parentHeight * (IMAGE_CONTAINER_HEIGHT_AS_PERCENT_OF_WRAPPER_SIZE / 100),
      imageContainerWidth = parentWidth * (IMAGE_CONTAINER_WIDTH_AS_PERCENT_OF_WRAPPER_SIZE / 100),
      imageContainerPixelsFromTop = ((IMAGE_CONTAINER_POSITION_PERCENT_FROM_TOP_OF_WRAPPER / 100) * parentHeight) + 'px',
      imageContainerPixelsFromLeft = ((IMAGE_CONTAINER_POSITION_PERCENT_FROM_LEFT_OF_WRAPPER / 100) * parentWidth) + 'px';
      

  imageContainer.height(imageContainerHeight);
  imageContainer.width(imageContainerWidth);
  imageContainer.css({
    'background-color': 'black',
    position: 'absolute',
    top: imageContainerPixelsFromTop,
    left: imageContainerPixelsFromLeft,
  });
      
}

function resizeSignatureBox () {
    var signature = $('#signature');
    
    
    
    // signature.height();
    // signature.width();
    signature.css({
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      'font-size': '2.35vh',
    });
}


function setBackgroundCSS () {
  $('body').css({
    'background-color': BACKGROUND_COLOR_ORIGIN
  });
}




function sizeImage (identity) {
  console.log(identity);
  var image = $('#' + identity);
  var imageContainer = image.parent(),
      containerWidth = imageContainer.width(),
      containerHeight = imageContainer.height(),
      imageStartHeight = image.height(),
      imageStartWidth = image.width(),
      isTallNotFat,
      shrinkMultiplier,
      imagePixelsFromLeft,
      imagePixelsFromTop,
      imageEndWidth,
      imageEndHeight;

  console.log(imageStartHeight);
  console.log(imageStartWidth);

  (containerHeight / imageStartHeight) < (containerWidth / imageStartWidth) ? isTallNotFat = true : isTallNotFat = false;
  
  if (isTallNotFat) {
    console.log('first');
    shrinkMultiplier = containerHeight / imageStartHeight;
    imageEndWidth = shrinkMultiplier * imageStartWidth;
    imageEndHeight = shrinkMultiplier * imageStartHeight;
    imagePixelsFromLeft = (containerWidth - imageEndWidth) / 2;
    imagePixelsFromTop = 0;
  } else {
    console.log('second');
    shrinkMultiplier = containerWidth / imageStartWidth;
    imageEndWidth = shrinkMultiplier * imageStartWidth;
    imageEndHeight = shrinkMultiplier * imageStartHeight;
    imagePixelsFromLeft = 0;
    imagePixelsFromTop = (containerHeight - imageEndHeight) / 2;
    
  }
  
  console.log(imageEndHeight);
  console.log(imageEndWidth);


  image.height(imageEndHeight);
  image.width(imageEndWidth);
  image.css({
    position: 'absolute',
    left: imagePixelsFromLeft + 'px',
    top: imagePixelsFromTop + 'px',
  });
  
}
















function imageEngine () {
  this.images = [{
    
  }];
  
  this.numberOfImages = 0;
  
  this.generateNewImage = function (imageLocation, imageAuthor, sourceURL) {
    this.numberOfImages++;
    this.placeImageIntoView(imageLocation);
    
    
  };
  
  this.placeImageIntoView = function (imageLocation) {
    var identity = this.numberOfImages - 1;
    var identityString = 'photo' + identity;
    
    console.log("this is a test");
    
    var elementToInsert = $(`<img id='` + identityString + `' src='` + imageLocation +  `'></img>`);
    $(elementToInsert).appendTo('#imageContainer');

    $(elementToInsert).load(function () {
          sizeImage(identityString);
    })

  };
  

};














$(document).ready( function () {
    sizeElements();
    
    // Start Image Processor
    var firstImageEngine = new imageEngine();
    firstImageEngine.generateNewImage('photos/LarryChen.jpg', 'Larry Chen', 'https://unsplash.com/photos/Nte-4RiRfwU');
    
    //firstImageEngine.generateNewImage('photos/JonathanSautter.jpg', 'Jonathan Sautter', 'https://pixabay.com/en/castle-hohenzollern-sunrise-973157/');
});
