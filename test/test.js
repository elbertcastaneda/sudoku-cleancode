require('babel-register')({
  presets: [ 'es2015' ],
  plugins: [
      ['babel-plugin-transform-builtin-extend', {
          globals: ['Error']
      }],
      ["module-resolver", {
        "root": ["./src"],
      }]
  ]
});

require('./SudokuTest');