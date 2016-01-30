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
     images[2]="photos/getrefe.jpg"
     images[3]="photos/RebeccaJohnston.jpg"
     images[4]="photos/JoshuaJackson.jpg"


     // start preloading
     for(i=0; i < images.length; i++) 
     {
          imageObj.src = images[i];
     }
} 


// SETTINGS
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Colors
const BACKGROUND_COLOR_ORIGIN = 'rgb(0, 1, 8)';

// Sizes
const IMAGE_CONTAINER_HEIGHT_AS_PERCENT_OF_WRAPPER_SIZE = 60;
const IMAGE_CONTAINER_WIDTH_AS_PERCENT_OF_WRAPPER_SIZE = 100;

const BRACKET_BUTTON_WIDTH_AS_PERCENT_OF_IMAGE_CONTAINER_WIDTH = 10;

// POSITIONS
const IMAGE_CONTAINER_POSITION_PERCENT_FROM_TOP_OF_WRAPPER = 20;
const IMAGE_CONTAINER_POSITION_PERCENT_FROM_LEFT_OF_WRAPPER = 0;

const PERCENT_LEFT_OR_RIGHT_OF_IMAGE_CONTAINER_FOR_BRACKET = 0;

// TRANSITION SPEED
const TRANSITION_LENGTH = 1000;

// SAFETY DELAY TIMER 
const TIME_TO_PREVENT_FURTHER_ACTIONS_ON_IMAGE_CAROUSEL = 1250;

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
    
    // Step 5: Set Left and Right Buttons
    setBrackets();
}

function resizeWrapperDiv (screemWidth, screenHeight, smallestLengthOrHeight) {
  var distanceFromTop = (screenHeight - smallestLengthOrHeight) / 2;
  var distanceFromLeft = (screemWidth - smallestLengthOrHeight) / 2;
    
  $('#fullWrapper').height(smallestLengthOrHeight);
  $('#fullWrapper').width(smallestLengthOrHeight);
  $('#fullWrapper').css({
    top: distanceFromTop,
    left: distanceFromLeft,
    'background-color': BACKGROUND_COLOR_ORIGIN,
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
    'background-color': '#252525',
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
      color: 'rgba(255, 255, 255, 0.7);',
    });
}


function setBackgroundCSS () {
  $('body').css({
    'background-color': BACKGROUND_COLOR_ORIGIN
  });
}


function setBrackets () {
  var rightBracket = $('#rightBracket'),
      leftBracket = $('#leftBracket'),
      parent = rightBracket.parent(),
      imageContainerWidth = parent.width(),
      imageContainerHeight = parent.height(),
      bracketWidth = imageContainerWidth * (BRACKET_BUTTON_WIDTH_AS_PERCENT_OF_IMAGE_CONTAINER_WIDTH / 100),
      bracketHeight = (210/129) * bracketWidth,
      bracketFromTop = (imageContainerHeight - bracketHeight) / 2,
      bracketFromLeftOrRight = imageContainerWidth * (PERCENT_LEFT_OR_RIGHT_OF_IMAGE_CONTAINER_FOR_BRACKET / 100);

      leftBracket.css({
        'min-width': bracketWidth + 'px',
        'max-width': bracketWidth + 'px',
        'min-height': bracketHeight + 'px',
        'max-height': bracketHeight + 'px',
        top: bracketFromTop + 'px',
        right: bracketFromLeftOrRight + 'px'
      });
      
      rightBracket.css({
        'min-width': bracketWidth + 'px',
        'max-width': bracketWidth + 'px',
        'min-height': bracketHeight + 'px',
        'max-height': bracketHeight + 'px',
        top: bracketFromTop + 'px',
        left: bracketFromLeftOrRight + 'px'        
      });
}










var isFirstTimeThrough = true;


function determineImageSizeAndPosition (identity, imageEngineObj, pictureNumber) {
  var image = $('#' + identity),
      imageContainer = image.parent(),
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



  (containerHeight / imageStartHeight) < (containerWidth / imageStartWidth) ? isTallNotFat = true : isTallNotFat = false;
  
  if (isTallNotFat) {
    shrinkMultiplier = containerHeight / imageStartHeight;
    imageEndWidth = shrinkMultiplier * imageStartWidth;
    imageEndHeight = shrinkMultiplier * imageStartHeight;
    imagePixelsFromLeft = (containerWidth - imageEndWidth) / 2;
    imagePixelsFromTop = 0;
  } else {
    shrinkMultiplier = containerWidth / imageStartWidth;
    imageEndWidth = shrinkMultiplier * imageStartWidth;
    imageEndHeight = shrinkMultiplier * imageStartHeight;
    imagePixelsFromLeft = 0;
    imagePixelsFromTop = (containerHeight - imageEndHeight) / 2;
  }
  


  imageEngineObj.images[pictureNumber]['imageWidth'] = imageEndWidth;
  imageEngineObj.images[pictureNumber]['imageHeight'] = imageEndHeight;
  imageEngineObj.images[pictureNumber]['properPixelsFromLeft'] = imagePixelsFromLeft;
  imageEngineObj.images[pictureNumber]['properPixelsFromTop'] = imagePixelsFromTop;


  if (imageEngineObj.images.length >= 3 && isFirstTimeThrough) {
    isFirstTimeThrough = false;
    imageEngineObj.positionCenterAndLeftAndRightPictures(1);
  }

  // sizeAndPositionOnScreenImage  (image, imageEndHeight, imageEndWidth, imagePixelsFromLeft, imagePixelsFromTop);

  
}

function sizeAndPositionOnScreenImage  (image, imageEndHeight, imageEndWidth, imagePixelsFromLeft, imagePixelsFromTop, isAnimated) {
  image.height(imageEndHeight);
  image.width(imageEndWidth);
  if (isAnimated) {
    image.css({
      position: 'absolute',
    });
    image.animate({
      left: imagePixelsFromLeft + 'px',
      top: imagePixelsFromTop + 'px',
    }, TRANSITION_LENGTH);      
  } else {
    image.css({
      position: 'absolute',
      left: imagePixelsFromLeft + 'px',
      top: imagePixelsFromTop + 'px',
    });  
  }
}

function positionPreviousImage  (image, imageEndWidth, isAnimated) {
  if (isAnimated) {
    image.animate({
      left: '100%'
    });
  } else {
    image.css({
      left: '100%'
    }, TRANSITION_LENGTH);
  }

}

function positionNextImage  (image, imageEndWidth, isAnimated) {

  if (isAnimated) {
    image.animate({
      left: '-200%'
    }, TRANSITION_LENGTH);    
  } else {
    image.css({
      left: '-200%'
    });    
  }

}












function imageEngine () {
  this.images = [];
  
  this.numberOfImages = 0;
  
  this.currentlyViewedPicture = 1;
  
  this.generateNewImage = function (imageLocation, imageAuthor, sourceURL) {
    this.numberOfImages++;
    this.recordImageObject(imageLocation, imageAuthor, sourceURL);
    this.placeImageIntoView(imageLocation);
  };
  
  this.recordImageObject = function (imageLocation, imageAuthor, sourceURL) {
    var newObj = {
      imageLocation: imageLocation,
      imageAuthor: imageAuthor,
      sourceURL: sourceURL,
    };
    this.images.push(newObj);
  };  
  
  this.placeImageIntoView = function (imageLocation) {
    var identity = this.numberOfImages - 1;
    var identityString = 'photo' + identity;
    var self = this;

    var elementToInsert = $(`<img id='` + identityString + `' src='` + imageLocation +  `'></img>`);
    $(elementToInsert).appendTo('#imageContainer');

    $(elementToInsert).load(function () {
          determineImageSizeAndPosition(identityString, self, identity);
    });
  };

  // motions: standard, backwards start, restart, toEnd
  this.positionCenterAndLeftAndRightPictures = function (centerPicNumber, motion) {
    var prevPicNumber,
        nextPicNumber,
        prevPicID,
        currentPicID,
        nextPicID,
        isPrevPicAnimated,
        isCurrentPicAnimated,
        isNextPicAnimated;
    
    
    if (centerPicNumber > 0 && centerPicNumber < this.images.length - 1) {
      prevPicNumber = centerPicNumber - 1;
      nextPicNumber = centerPicNumber + 1;
    } else if (centerPicNumber == 0) {
      prevPicNumber = this.images.length - 1;
      nextPicNumber = centerPicNumber + 1;      
    } else if (centerPicNumber == this.images.length - 1 ) {
      prevPicNumber = centerPicNumber - 1;
      nextPicNumber = 0;            
    }
    
    console.log(motion);
    switch (motion) {
      case 'standard':
        isPrevPicAnimated = true;
        isCurrentPicAnimated = true;
        isNextPicAnimated = false;
        break;
      case 'backwards':
        isPrevPicAnimated = false;
        isCurrentPicAnimated = true;
        isNextPicAnimated = true;
        break;        
      case 'restart':
        isPrevPicAnimated = true;
        isCurrentPicAnimated = true;
        isNextPicAnimated = false;        
        break;
      case 'toEnd':
        isPrevPicAnimated = false;
        isCurrentPicAnimated = true;
        isNextPicAnimated = true;        
        break;
      case 'start':
        isPrevPicAnimated = false;
        isCurrentPicAnimated = false;
        isNextPicAnimated = false;        
        break;        
    }
    
    
    
    if (this.numberOfImages >= 3) {
      prevPicID = '#photo' + String(prevPicNumber);
      currentPicID =  '#photo' + String(centerPicNumber);
      nextPicID =  '#photo' + String(nextPicNumber);



    

        positionPreviousImage (
          $(prevPicID),
         this.images[centerPicNumber]['imageWidth'],
         isPrevPicAnimated
        );
      
       sizeAndPositionOnScreenImage(
         $(currentPicID),
         this.images[centerPicNumber]['imageHeight'],
         this.images[centerPicNumber]['imageWidth'],
         this.images[centerPicNumber]['properPixelsFromLeft'],
         this.images[centerPicNumber]['properPixelsFromTop'],
         isCurrentPicAnimated
        );
        
        positionNextImage (
          $(nextPicID),
         this.images[centerPicNumber]['imageWidth'],
         isNextPicAnimated
        );        
    }
  }; 

}







function engageImageEngine () {
    var firstImageEngine = new imageEngine();

    var isANeedToSlowDown = false;
  

    firstImageEngine.generateNewImage('photos/JonathanSautter.jpg', 'Jonathan Sautter', 'https://pixabay.com/en/castle-hohenzollern-sunrise-973157/');

    firstImageEngine.generateNewImage('photos/RebeccaJohnston.jpg', 'Rebecca Johnston', 'https://unsplash.com/photos/nuRYwOJryyk');

    firstImageEngine.generateNewImage('photos/LarryChen.jpg', 'Larry Chen', 'https://unsplash.com/photos/Nte-4RiRfwU');

    firstImageEngine.generateNewImage('photos/getrefe.jpg', 'Refe', 'http://getrefe.com/downloads/seashore/');

    firstImageEngine.generateNewImage('photos/JoshuaJackson.jpg', 'Joshua Jackson', 'https://unsplash.com/photos/NvGwP_hw1iw');


    firstImageEngine.positionCenterAndLeftAndRightPictures(0, 'start');


    $(document).keydown( function (event) {
      if (!isANeedToSlowDown) {
        isANeedToSlowDown = true;
        switch (event.which) {
          case 39: // NEXT
          case 38:
            moveForwardThroughCarousel(firstImageEngine, 'next');
            break;
          case 37: // PREVIOUS
          case 40:
            moveForwardThroughCarousel(firstImageEngine, 'previous');
            break;
        }
        window.setTimeout(function() {isANeedToSlowDown = false;}, TIME_TO_PREVENT_FURTHER_ACTIONS_ON_IMAGE_CAROUSEL);
      }        
    });
    
    $('#rightBracket').click(function () {
      if (!isANeedToSlowDown) {
        isANeedToSlowDown = true;
        moveForwardThroughCarousel(firstImageEngine, 'previous');
        window.setTimeout(function() {isANeedToSlowDown = false;}, TIME_TO_PREVENT_FURTHER_ACTIONS_ON_IMAGE_CAROUSEL);
      }
    });

    $('#leftBracket').click(function () {
      if (!isANeedToSlowDown) {
        isANeedToSlowDown = true;
        moveForwardThroughCarousel(firstImageEngine, 'next');
        window.setTimeout(function() {isANeedToSlowDown = false;}, TIME_TO_PREVENT_FURTHER_ACTIONS_ON_IMAGE_CAROUSEL);
      }      
    });
  
}

function moveForwardThroughCarousel (imageEngineObj, movement) {
  var motion;
  if (movement === 'next') {
    if (imageEngineObj.currentlyViewedPicture < imageEngineObj.images.length - 1) {
      imageEngineObj.currentlyViewedPicture++;
      motion = 'standard';
    } else {
      imageEngineObj.currentlyViewedPicture = 0;
      motion = "restart";
    }
  } else if (movement === 'previous') {
    if (imageEngineObj.currentlyViewedPicture > 0) {
      imageEngineObj.currentlyViewedPicture--;
      motion = "backwards";
    } else {
      imageEngineObj.currentlyViewedPicture = imageEngineObj.images.length - 1;
      motion = "toEnd";
    }
    
  }

    imageEngineObj.positionCenterAndLeftAndRightPictures(imageEngineObj.currentlyViewedPicture, motion);

  
}



$(document).ready( function () {
  sizeElements();

  $(window).resize( function () {
    sizeElements();
    determineImageSizeAndPosition();
  });
  
  // Start Image Processor
  engageImageEngine ();
  
  $('#imageContainer').hover(
    function (event) {
      $('.bracketDiv').fadeIn(1000);
    }, function () {
      $('.bracketDiv').hide();      
    }
    )

  
});
