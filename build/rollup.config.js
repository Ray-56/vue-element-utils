// const babel = require("rollup-plugin-babel");
import babel from "rollup-plugin-babel";
// import { uglify } from "rollup-plugin-uglify";
// import { minify } from 'uglify-es';
import { terser } from "rollup-plugin-terser";
import { name, version, author } from "../package.json";

// banner
const banner =
    `${"/*!\n" + " * "}${name}.js v${version}\n` +
    ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the MIT License.\n` +
    ` */`;

export default [
    // .js | .cjs.js | .esm.js
    {
        input: "src/main.js",
        // output: {
        //     file: "element-custom-directive-utils.min.js",
        //     format: "cjs",
        //     name: "element-custom-directive-utils",
        // },
        output: [
            // umd development version with sourcemap
            {
                file: `dist/${name}.js`,
                format: "umd",
                // format: "esm",
                name: name,
                banner,
                sourcemap: true,
            },
            // cjs and esm version
            // {
            //     file: `dist/${name}.cjs.js`,
            //     format: "cjs",
            //     banner,
            // },
            // cjs and esm version
            {
                file: `dist/${name}.esm.js`,
                format: "es",
                banner,
            },
        ],
        plugins: [
            terser(),
            babel({
                exclude: "node_modules/**", // 只编译我们的源代码
            }),
        ],
    },
    // .min.js
    {
        input: "src/main.js",
        output: [
            // umd with compress version
            {
                file: `dist/${name}.min.js`,
                format: "umd",
                name,
                banner,
            },
        ],
        plugins: [
            terser(),
            babel({
                exclude: "node_modules/**", // 只编译我们的源代码
            }),
        ],
    },
];
