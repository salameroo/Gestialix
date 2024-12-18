import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const plugin = require("tailwindcss/plugin");
// // tailwind.config.js

// module.exports = {
//     content: [
//         './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
//         './storage/framework/views/*.php',
//         './resources/views/**/*.blade.php',
//         './resources/js/**/*.jsx',
//     ],

//     theme: {
//         extend: {
//             colors: {
//                 // Define los colores utilizando variables CSS
//                 global: {
//                     bg: "var(--global-bg)",
//                     sidebar: "var(--global-sidebar)",
//                 },
//             },
//             fontFamily: {
//                 sans: ['Figtree', ...defaultTheme.fontFamily.sans],
//             },
//         },
//     },
//     plugins: [
//         plugin(function ({ addBase }) {
//             // Define estilos globales
//             addBase({
//                 body: {
//                     backgroundColor: "var(--global-bg)",
//                     color: "white", // Cambia según tus necesidades
//                 },
//             });
//         }),
//         forms,
//     ],
// };


export default {
    darkMode: 'class', // Activa el soporte para la clase `dark`
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};