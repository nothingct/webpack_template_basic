// browser 가 아닌 node.js 에서 webpack은 동작 

//import
const path =  require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
//export 
module.exports = {
  //parcel index.html : parcel번들러의 진입점을 index.html 로 지정
  //webpack은 기본적으로 JS을 진입점으로 설정한다. 

  //파일을 읽어들이기 시작하는 진입점 설정 
  entry: './js/main.js',
  
  // 결과물(번들)을 반환하는 설정 
  output:{
    path: path.resolve(__dirname,'dist'),//절대경로로 표시해주어야 한다.
    filename: 'main.js',
    clean: true
  },
  // 모듈 관련 설정 추가
  module:{
    rules:[
      {
        test: /\.s?css$/, // .css, .scss로 끝나는 파일들을 test한다
        use:[
          'style-loader', //html에서 style 태그를 해석하기 위해
          'css-loader',    //js파일에 의해 inport된 css파일을 load하기 위해
          'postcss-loader',
          'sass-loader'
          
        ]
      },
      {
        test: /\.js$/,
        use:[
          'babel-loader'
        ]
      }
    ]
  },
  // 번들링 후 결과물의 처리방식 등 다양한 플러그인들을 설정 
  plugins:[
    new HtmlPlugin({
      template:'./index.html'// 해당 경로 의 html파일을 지정한다.
    }),
    new CopyPlugin({
      patterns:[
        {from : 'static'}
      ]
    })
  ],

  devServer:{
    host: 'localhost'
  }
}