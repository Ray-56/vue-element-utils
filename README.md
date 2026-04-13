# vue-element-utils

> Utility directives and helpers for Vue projects built with Element UI.

Custom directives that extend several Element UI components.

This project uses `yarn`.

Included directives:

- `v-el-select-scroll`: Listen for scroll events in an `el-select` dropdown to support lazy loading
- `v-el-dialog-drag`: Drag a Dialog by its header
- `v-el-dialog-drag-width`: Resize a Dialog horizontally
- `v-el-dialog-corner`: Resize a Dialog from the lower-right corner
- `v-clipboard`: Copy text to the clipboard, similar to `Ctrl + C`

Included prototype method:

- `$clipboard(text)`: Copy text to the clipboard programmatically

## How to use

```sh
yarn add vue-element-utils
npm install vue-element-utils
```

Import it in your entry file:

```js
import elementUtils from 'vue-element-utils'

Vue.use(elementUtils);
```

### v-select-scroll

![](https://raw.githubusercontent.com/guokangf/image-service/master/picgo/20200608/151123.gif)

```vue
<template>
    <el-select v-model="value" placeholder="Please select" v-el-select-scroll="selectScroll">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
    </el-select>
</template>

<script>
function createOptions(len, start = 0) {
    return Array(len)
        .fill(0)
        .map((_, index) => ({
            value: `option-${start + index}`,
            label: `Option ${start + index}`
        }));
}

export default {
    data() {
        return {
            options: createOptions(10),
            value: '',
            pageIndex: 0,
        };
    },
    mounted() {
        this.options = createOptions(10);
    },
    methods: {
        selectScroll() {
            console.log('selectScroll');
            // This method runs when the Select dropdown reaches the bottom.
            // Use it to load the next page of options.
            this.pageIndex++;
            this.options.push(...createOptions(10, 10 * this.pageIndex));
        },
    }
};
</script>
```

## v-dialog-drag

![](https://raw.githubusercontent.com/guokangf/image-service/master/picgo/20200608/151653.gif)

```vue
<template>
    <section>
        <el-button type="text" @click="dialogVisible = true">Open Dialog</el-button>

        <el-dialog
            title="Notice"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            v-el-dialog-drag
        >
            <span>This is a message.</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        };
    }
};
</script>
```

## v-dialog-drag-width

![](https://raw.githubusercontent.com/guokangf/image-service/master/picgo/20200608/152328.gif)

```vue
<template>
    <section>
        <el-button type="text" @click="dialogVisible = true">Open Dialog</el-button>

        <el-dialog
            title="Notice"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            v-el-dialog-drag-width
        >
            <span>This is a message.</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        };
    }
};
</script>
```

## v-dialog-corner

![v-dialog-corner.gif](https://raw.githubusercontent.com/Ray-56/image-service/master/picgo20201129/225645.gif)

```vue
<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">Open Dialog</el-button>

        <el-dialog
            title="Notice"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            v-el-dialog-corner
        >
            <span>Drag from the lower-right corner to resize.</span>
            <span slot="footer" class="dialog-footer">
                <el-button>Cancel</el-button>
                <el-button type="primary">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
```

## Clipboard

![](https://raw.githubusercontent.com/guokangf/image-service/master/picgo/20200608/152702.gif)

- Method 1: `v-clipboard` directive
- Method 2: `$clipboard(string)` helper

```vue
<template>
    <div>
        <el-button
            v-clipboard:success="clipboardSuccess"
            v-clipboard:error="clipboardError"
            v-clipboard="'Copied content 1'"
        >
            Method 1
        </el-button>
        <el-button @click="handleCopy">Method 2</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        handleCopy() {
            this.$clipboard('Copied content 2').then(res => {
                console.log(res);
            });
        },
        clipboardSuccess(msg) {
            console.log(msg);
        },
        clipboardError(err) {
            console.log(err);
        },
    }
};
</script>
```
