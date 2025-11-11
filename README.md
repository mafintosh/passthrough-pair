# duplexthrough

Basically a duplex passthrough

```
npm install duplexthrough
```

## Usage

``` js
const pair = require('duplexthrough')

const [a, b] = pair()

a.write('hello')

b.on('data', function (data) {
  // hello
  b.write('echo: ' + data)
})

a.on('data', function (data) {
  // echo: hello
})
```

Mostly useful for testing flows

## License

Apache-2.0
