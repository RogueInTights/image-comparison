(() => {
    let boxes = [].slice.call(document.querySelectorAll('.ic-box'));
    let sliders = [].slice.call(document.querySelectorAll('.ic-slider'));
    
    // Disallow drag and drop to boxes and his children:
    for (let box of boxes) {
        box.addEventListener('dragstart', (e) => {
            e.preventDefault(); 
            return false;
        });
    }
    
    // Callback functions:
    let startMove = (e) => {  
        let box = e.target.parentElement;
        
        box.addEventListener('mousemove', moveControl);
        box.addEventListener('touchmove', moveControl);
        
        document.addEventListener('mouseup', finishMove);
        document.addEventListener('touchend', finishMove);
    };
    
    let finishMove = () => {
        for (let box of boxes) {
            box.removeEventListener('mousemove', moveControl);
            box.removeEventListener('touchmove', moveControl);
            
            document.removeEventListener('mouseup', finishMove);
            document.removeEventListener('touchend', finishMove);
        }
    };
    
    let moveControl = (e) => {
        let cursorX = e.type === 'mousemove' ? e.pageX : e.targetTouches[0].pageX;
        let containerX = getCoordinateX(e.currentTarget);
        let x = cursorX - containerX;
        
        let maxX = parseInt(getComputedStyle(e.currentTarget).width);

        x = x < 0 ? 0 : x;
        x = x > maxX ? maxX : x;
        
        let children = [].slice.call(e.currentTarget.children);
        let [leftImage] = children.filter((item) => {
            return item.classList.contains('ic-left');
        });
        let [slider] = children.filter((item) => {
            return item.classList.contains('ic-slider');
        });
        
        leftImage.style.width = `${x}px`;
        slider.style.left = `${x}px`;
    };
        
    // Event listeners:
    for (let slider of sliders) {
        slider.addEventListener('mousedown', startMove);
        slider.addEventListener('touchstart', startMove);
    }
     
    // Tools:
    function getCoordinateX(elem) {
        let box = elem.getBoundingClientRect();
        return box.left + pageXOffset;
    }
})();