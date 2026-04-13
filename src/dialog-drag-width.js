export default {
    bind(el) {
        const dragDom = el.querySelector('.el-dialog');
        const lineEl = document.createElement('div');
        lineEl.style =
            'width: 2px; background: inherit; height: 80%; position: absolute; right: 0; top: 0; bottom: 0; margin: auto; z-index: 1; cursor: w-resize;';
        lineEl.addEventListener(
            'mousedown',
            function(e) {
                // Measure the pointer offset when dragging starts.
                const disX = e.clientX - el.offsetLeft;

                // Store the current width.
                const curWidth = dragDom.offsetWidth;

                document.onmousemove = function(e) {
                    e.preventDefault(); // Disable default behavior while dragging.

                    // Compute the horizontal drag distance.
                    const l = e.clientX - disX;
                    
                    dragDom.style.width = `${curWidth + l}px`;
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
