# passthrough-pair

Two duplex streams that are eachothers passthrough

```
npm install passthrough-pair
```

## Usage

``` js
const pair = require('passthrough-pair')

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
