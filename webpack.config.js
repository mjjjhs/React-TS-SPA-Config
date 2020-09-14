const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
    let optimization = {};
    if( env !== 'dev') {
        optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    terserOptions: {
                        warnings: false,
                        compress: {
                            warnings: false,
                            unused: true,
                        },
                        ecma: 6,
                        mangle: true,
                        unused: true,
                    },
                    sourceMap: true
                })
            ]
        };
    }

    return {
        devtool: 'source-map',
        entry: {
            BrandManagement: './src/brand-management/index.tsx',
            yanoljaCategory: './src/category-management/index.tsx',
            OrderManagemnet: './src/order-management/index.tsx'
        } ,
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            modules: ['node_modules'],
            plugins: [
                // Adds support for installing with Plug'n'Play, leading to faster installs and adding
                // guards against forgotten dependencies and such.
                PnpWebpackPlugin
            ]
        },
        resolveLoader: {
            plugins: [
                // Also related to Plug'n'Play, but this time it tells webpack to load its loaders
                // from the current package.
                PnpWebpackPlugin.moduleLoader(module)
            ]
        },
        output: {
            path: path.resolve(__dirname, "../main/webapp/static/js/view/dist"),
            filename: '[name].bundle.js'
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    parser: {
                        requireEnsure: false
                    }
                },
                {
                    test: /\.(js)$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(tsx|ts)$/,
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                },
                {
                    test: /\.(tsx|ts)$/,
                    include: [
                        path.resolve(__dirname, "node_modules/@lqt/tti")
                    ],
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                allowTsInNodeModules : true,
                                compilerOptions: {
                                    "noEmit": false
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            })
        ],
        optimization
    };
}