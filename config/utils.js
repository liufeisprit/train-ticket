const path = require('path')
const glob = require('glob')
const ENTRY_PATH = path.resolve(__dirname,'../public')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 多页面输入模板配置
exports.htmlPlugin = function () {
    const entryHtml = glob.sync(ENTRY_PATH+'/**.html')
    const arr = []
    
    entryHtml.forEach(filePath=>{
      const filename = filePath.replace(/.*\/\w+\/(\w+)(\.html|\.js$)/,(rs,$1)=>$1)
      let conf = {
        filename: filename+'.html',// 要打包输出的文件名
        template: filePath,// 打包输出后该html文件的名称
        inject: true,
        chunks:[filename]
      }
      
      if(process.env.NODE_ENV==='production'){
        conf=merge(conf,{
          chunks:['common','vendor'],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
          chunksSortMode: 'auto',
        })
      }
      arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
  }