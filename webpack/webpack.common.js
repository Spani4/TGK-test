const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin      = require('vue-loader/lib/plugin')
const SpriteLoaderPlugin   = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const Html                 = require('./Html');
const Entry                = require('./Entry');

const PUBLIC_PATH = path.join(__dirname, '../public');
// const IMG_PATH = path.join(PUBLIC_PATH, 'images');
// const FAVICONS_PATH = path.join(PUBLIC_PATH, 'favicons');

module.exports = {
    entry       : {
        ...Entry.create(),
    },
    output      : {
        path    : PUBLIC_PATH,
        filename: 'js/[name].js',
        chunkFilename:  'js/[name].js',
    },
    optimization: {
        noEmitOnErrors: true,
        splitChunks   : {
            chunks: 'all',
            name: false,
        }
    },
    plugins     : [
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     { from: 'src/images/raw', to: IMG_PATH },
        //     { from: 'src/images/favicons', to: FAVICONS_PATH }
        // ]), 
        new SpriteLoaderPlugin({
            plainSprite: true,
        }),
        ...Html.create(),
        new VueLoaderPlugin(),
    ],
    resolve     : {
        alias: {
            '~': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module      : {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test   : /\.pug$/,
                oneOf: [{
                    resourceQuery: /^\?vue/,
                    use: 'pug-plain-loader'
                }, {
                    use: {
                        loader : 'pug-loader',
                        options: {
                            pretty: true,
                        },
                    }
                }],
            },
            {
                test   : /\.mjs$/,
                include: /node_modules/,
                type   : 'javascript/auto'
            },
            {
                test: /fonts[\\\/].+\.(eot|ttf|woff|woff2)$/,
                use : {
                    loader : 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                },
            },
            {
                test: /icons[\\\/].+\.svg$/i,
                use : [
                    {
                        loader : 'svg-sprite-loader',
                        // options: {
                        //     extract       : true,
                        //     spriteFilename: 'icons/icons.svg',
                        // }
                    },
                    {
                        loader: path.resolve(__dirname, './svgClean.js'),
                    },
                ]
            },
        ]
    }
};

