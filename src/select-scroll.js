export default {
    bind(el, binding) {
        // 获取 element-ui 定义好的 scroll 盒子
        const selectWrap = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );

        selectWrap.addEventListener('scroll', function() {
            /**
             * scrollHeight 获取元素内容高度（只读）
             *
             * scrollTop 获取或者设置元素的偏移量，常用于：计算滚动条的位置，当一个元素的容器没有产生方向的滚动条，那它的 scrollTop 的值默认为0
             *
             * clientHeight 读取元素的可见高度（只读）
             *
             * 如果元素滚动到底, 等式`ele.scrollHeight - ele.scrollTop === ele.clientHeight;`返回 true, 没有则返回 false
             */
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            condition && binding.value();
        });
    }
}