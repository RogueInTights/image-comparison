(function () {
    var boxes = [].slice.call(document.querySelectorAll('.ic-box'));
    var sliders = [].slice.call(document.querySelectorAll('.ic-slider'));

    // Disallow drag and drop to boxes and his children:
    for (var i in boxes) {
        boxes[i].addEventListener('dragstart', function(e) {
            e.preventDefault(); 
            return false;
        });
    }

    // Callback functions:
    var startMove = function startMove(e) {
        var box = e.target.parentElement;

        box.addEventListener('mousemove', moveControl);
        box.addEventListener('touchmove', moveControl);
        
        document.addEventListener('mouseup', finishMove);
        document.addEventListener('touchend', finishMove);
    };

    var finishMove = function finishMove() {
        for (var i in boxes) {
            boxes[i].removeEventListener('mousemove', moveControl);
            boxes[i].removeEventListener('touchmove', moveControl);
            
            document.removeEventListener('mouseup', finishMove);
            document.removeEventListener('touchend', finishMove);
        }
    };

    var moveControl = function moveControl(e) {
        var cursorX = e.type === 'mousemove' ? e.pageX : e.targetTouches[0].pageX;
        var containerX = getCoordinateX(e.currentTarget);
        var x = cursorX - containerX;

        var maxX = parseInt(getComputedStyle(e.currentTarget).width);

        x = x < 0 ? 0 : x;
        x = x > maxX ? maxX : x;

        var children = [].slice.call(e.currentTarget.children);
        var leftImage = children.filter(function (item) {
            return item.classList.contains('ic-left');
        })[0];
        var slider = children.filter(function (item) {
            return item.classList.contains('ic-slider');
        })[0];

        leftImage.style.width = x + 'px';
        slider.style.left = x + 'px';
    };

    // Event listeners:
    for (var i in sliders) {
        sliders[i].addEventListener('mousedown', startMove);
        sliders[i].addEventListener('touchstart', startMove);
    }   

    // Tools:
    function getCoordinateX(elem) {
        var box = elem.getBoundingClientRect();
        return box.left + pageXOffset;
    }
})();