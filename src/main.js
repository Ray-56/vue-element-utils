import selectScroll from './select-scroll';
import dialogDrag from './dialog-drag';
import dialogDragWidth from './dialog-drag-width';
import dialogCorner from './dialog-corner';
import clipboard, { $clipboard } from './clipboard';

const util = {
    install(Vue) {
        Vue.prototype.$clipboard = $clipboard;
        Vue.directive('clipboard', clipboard);
        Vue.directive('el-dialog-drag', dialogDrag);
        Vue.directive('el-dialog-drag-width', dialogDragWidth);
        Vue.directive('el-dialog-corner', dialogCorner);
        Vue.directive('el-select-scroll', selectScroll);
    }
};

export default util;