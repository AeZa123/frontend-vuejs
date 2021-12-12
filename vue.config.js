module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/demovuejs/' : '/',
    configureWebpack: {
        devtool: 'source-map'
    }
}