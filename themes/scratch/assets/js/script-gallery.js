$( document ).ready(function() {

    var $container = $('.gallery-container');
    var $imgs = $('.gallery-container .gallery-image');
    var $imgWidth = $imgs.first().outerWidth();//read the image width
    var $imgCount = $imgs.length;//count the images


    $container.width($imgWidth*($imgCount+2)); //set the width of the container to the number of images - plus 2 to account for the cloned images
    $imgs.first().addClass('endless_slider_first'); //identify the first and last images
    $imgs.last().addClass('endless_slider_last');
    $('.endless_slider_first').clone().appendTo($container); //clone the first image and put it at the end
    $('.endless_slider_last').clone().prependTo($container); //clone the last image and put it at the front
    $container.css({'left':-1*$imgWidth+'px'}); //reset the slider so the first image is still visible
    
    $('.gallery-guide--right').click(goRight);
    $('.gallery-guide--left').click(goLeft);

    $(document).on('swiped-left', $container, function() {goRight()})
    $(document).on('swiped-right', $container, function() {goLeft()})

    function goLeft() {
        $container.stop(true,true); //complete any animation still running  
        var $newLeft = $container.position().left+(1*$imgWidth);//calculate the new position which is the current position plus the width of one image
        $container.animate({'left':$newLeft+'px'}, 300, function(){//slide to the new position
            if (Math.abs($newLeft) == (0)) { //if the slider is displaying the first image, which is the clone of the last image
                $container.css({'left':-($imgCount)*$imgWidth+'px'});//reset the slider back to the last image without animating 
            }
        });
        return false;
    }

    function goRight() {
        $container.stop(true,true); //complete any animation still running - in case anyone's a bit click happy... 
        var $newLeft = $container.position().left-(1*$imgWidth); //calculate the new position which is the current position minus the width of one image
        $container.animate( {'left':$newLeft+'px'} , 300,
            function() { //slide to the new position...
                if ( Math.abs($newLeft) == (($imgCount+1)*$imgWidth) ) { $container.css({'left':-1*$imgWidth+'px'}); }
            }
        );
        return false;
    }

    document.onkeydown = function(e) {
        switch(e.which) {
            case 37: goLeft();// left
            break;
    
            case 39: goRight();// right
            break;
    
            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    };
});
