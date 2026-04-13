export default {
    bind(el) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cssText += ';cursor:move;';

        // Read the current position styles across browsers.
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        const w = document.documentElement.clientWidth;
        const h = document.documentElement.clientHeight;
        
        const headerWidth = dialogHeaderEl.offsetWidth;
        const headerHeight = dialogHeaderEl.offsetHeight;
        const domHeight = dragDom.offsetHeight;

        dialogHeaderEl.onmousedown = (e) => {
            // Measure the pointer offset when dragging starts.
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const cursor2left = e.clientX - dialogHeaderEl.getBoundingClientRect().left;
            const cursor2right = headerWidth - cursor2left;
            const cursor2top = e.clientY - dragDom.getBoundingClientRect().top;
            const cursor2bottom = domHeight - cursor2top;

            // Normalize pixel-based position values.
            let styL, styT;

            // Element UI may start with percentage-based positioning.
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }

            document.onmousemove = function(e) {
                // Compute the movement delta from the initial pointer position.
                let l = e.clientX - disX;
                let t = e.clientY - disY;
                   
                if (e.clientX < headerWidth) {
                    // Clamp to the left edge of the viewport.
                    l = l + cursor2left - e.clientX;
                }
                if (e.clientX + cursor2right > w) {
                    // Clamp to the right edge of the viewport.
                    l = l - (e.clientX + cursor2right - w);
                }  
                if (e.clientY < headerHeight) {
                    // Clamp to the top edge of the viewport.
                    t = t + cursor2top - e.clientY;
                }
                if (e.clientY + cursor2bottom > h) {
                    // Clamp to the bottom edge of the viewport.
                    t = t - (e.clientY + cursor2bottom - h);
                }

                // Move the dialog.
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                // Expose the current position if needed.
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}
