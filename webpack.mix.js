const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps()
    .scripts([
        "public/js/app.js",
        "resources/js/masters/users.js"
    ], "public/js/masters/users.js")
    .styles([
        "public/css/app.css",
    ], "public/css/masters/users.css")
    .scripts([
        "public/js/app.js",
        "resources/js/masters/page.js"
    ], "public/js/masters/page.js")
    .styles([
        "public/css/app.css",
    ], "public/css/masters/page.css")
    .scripts([
        "public/js/app.js",
        "resources/js/masters/customer.js"
    ], "public/js/masters/customer.js")
    .styles([
        "public/css/app.css",
    ], "public/css/masters/customer.css")
    .scripts([
        "public/js/app.js",
        "resources/js/masters/qa_disposition.js"
    ], "public/js/masters/qa_disposition.js")
    .styles([
        "public/css/app.css",
    ], "public/css/masters/qa_disposition.css");