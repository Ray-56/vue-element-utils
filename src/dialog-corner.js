// Resize from the lower-right corner.
export default {
    bind(el) {
        const dragDom = el.querySelector('.el-dialog');
        const lineEl = document.createElement('div');
        lineEl.style =
            'width: 6px; background: inherit; height: 6px; position: absolute; right: 0; bottom: 0; margin: auto; z-index: 1; cursor: nwse-resize;';
        lineEl.addEventListener(
            'mousedown',
            function(e) {
                // Measure the pointer offset when dragging starts.
                const disX = e.clientX - el.offsetLeft;
                const disY = e.clientY - el.offsetTop;

                // Store the current width and height.
                const curWidth = dragDom.offsetWidth;
                const curHeight = dragDom.offsetHeight;

                document.onmousemove = function(e) {
                    e.preventDefault(); // Disable default behavior while dragging.

                    // Compute the drag distance on both axes.
                    const xl = e.clientX - disX;
                    const yl = e.clientY - disY
                    
                    dragDom.style.width = `${curWidth + xl}px`;
                    dragDom.style.height = `${curHeight + yl}px`;
                };

                document.onmouseup = function(e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            false
        );
        dragDom.appendChild(lineEl);
    }
}
