export default {
    bind(el) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cssText += ';cursor:move;';

        // 获取原有属性 ie dom 元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        const w = document.documentElement.clientWidth;
        const h = document.documentElement.clientHeight;
        
        const headerWidth = dialogHeaderEl.offsetWidth;
        const headerHeight = dialogHeaderEl.offsetHeight;
        const domHeight = dragDom.offsetHeight;

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const cursor2left = e.clientX - dialogHeaderEl.getBoundingClientRect().left;
            const cursor2right = headerWidth - cursor2left;
            const cursor2top = e.clientY - dragDom.getBoundingClientRect().top;
            const cursor2bottom = domHeight - cursor2top;

            // 获取到的值带 px 正则匹配替换
            let styL, styT;

            // 注意在 ie 中 第一次获取到的值为组件自带 50% 移动之后赋值为 px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }

            document.onmousemove = function(e) {
                // 通过事件委托，计算移动的距离
                let l = e.clientX - disX;
                let t = e.clientY - disY;
                   
                if (e.clientX < headerWidth) {
                    // 命中左侧极端值区域，l 取极小值
                    l = l + cursor2left - e.clientX;
                }
                if (e.clientX + cursor2right > w) {
                    // 命中右侧极端值区域，l 取极大值
                    l = l - (e.clientX + cursor2right - w);
                }  
                if (e.clientY < headerHeight) {
                    // 命中上侧极端值区域, t 取极小值
                    t = t + cursor2top - e.clientY;
                }
                if (e.clientY + cursor2bottom > h) {
                    // 命中下侧极端值区域, t 取极大值
                    t = t - (e.clientY + cursor2bottom - h);
                }

                // 移动当前元素
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function(e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}