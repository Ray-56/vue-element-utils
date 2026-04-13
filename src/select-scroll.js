export default {
    bind(el, binding) {
        // Use the scroll container provided by Element UI.
        const selectWrap = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );

        selectWrap.addEventListener('scroll', function() {
            /**
             * scrollHeight returns the full content height (read-only).
             *
             * scrollTop reads or sets the scroll offset. It is commonly used to
             * determine the current scrollbar position.
             *
             * clientHeight returns the visible height of the element
             * (read-only).
             *
             * When the element reaches the bottom,
             * `ele.scrollHeight - ele.scrollTop === ele.clientHeight`
             * evaluates to true.
             */
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            condition && binding.value();
        });
    }
}
