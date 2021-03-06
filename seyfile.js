'use strict';

//WhatTheTag-specific configurations
let wtt = {
    jsPath          : './resources/assets/js/',
    lessPath        : './resources/assets/less/',
    nodePath        : './node_modules/',
    tempPath        : './temp_dir/',
    public: {
        fontPath    : './public/fonts/',
        cssPath     : './public/css/',
        jsPath      : './public/js/'
    }
};

let cssFiles = [
    'bootstrap/dist/css/bootstrap.min.css',
    'datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.min.css',
    'font-awesome/css/font-awesome.min.css',
    'bootstrap-social/bootstrap-social.css',
    'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
    'dropify/dist/css/dropify.min.css'
];
cssFiles = cssFiles.map(function(el) {
    return wtt.nodePath + el;
});

let javaScripts = [
    'jquery/dist/jquery.min.js',
    'bootstrap/dist/js/bootstrap.min.js',
    'bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js',
    'datatables/media/js/jquery.dataTables.min.js',
    'datatables-bootstrap3-plugin/media/js/datatables-bootstrap3.min.js',
    'social-share-js/dist/jquery.socialshare.min.js',
    'dropify/dist/js/dropify.min.js'
];

javaScripts = javaScripts.map(function(el) {
    return wtt.nodePath + el;
});
//WhatTheTag-specific configurations END

let config = new sey.config();

config.bundle('global')
    .set({
        babel: {
        },

        eslint: {
        },

        less: {
        }
    });


//Build fonts
config.bundle('main')
    .set({
        clean: {
            beforeBuild: wtt.public.fontPath
        }
    })
    .src([
        wtt.nodePath + 'font-awesome/fonts/**.*',
        wtt.nodePath + 'bootstrap/fonts/**.*',
        wtt.nodePath + 'dropify/dist/fonts/**.*'
    ])
    .dest(wtt.public.fontPath)
    .exec();
//Build fonts END

//Build JavaScripts

//vendor.min.js
config.bundle('main')
    .set({
        clean: {
            beforeBuild: wtt.tempPath
        }
    })
    .src(javaScripts)
    .concat('vendor.min.js')
    .dest(wtt.tempPath)
    .exec();

//app-specific.min.js
config.bundle('main')
    /*.set({
        clean: {
            beforeBuild: wtt.tempPath
        }
    })*/
    .src([
        wtt.jsPath + '**/*.js'
    ])
    .optimize()
    .minify()
    .concat('app-specific.min.js')
    .dest(wtt.tempPath)
    .exec();

//app.min.js
config.bundle('main')
    .set({
        clean: {
            before: wtt.public.cssPath
        }
    })
    .src([
        wtt.tempPath + 'vendor.min.js',
        wtt.tempPath + 'app-specific.min.js'
    ])
    .concat('app.min.js')
    .dest(wtt.public.jsPath)
    .exec();
//Build JavaScripts END


//Build CSS Files
config.bundle('main')
    .set({
        clean: {
            before: wtt.public.jsPath
        }
    })
    //.src(cssFiles.concat(wtt.lessPath + '**/*.less'))
    .src(cssFiles)
    .src(wtt.lessPath + '**/*.less')
    .transpile()
    .minify()
    .concat('app.min.css')
    .dest(wtt.public.cssPath)
    .exec();
//Build CSS Files END

sey.run(config);
