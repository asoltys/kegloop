const exec = require('child_process').exec
const bcoin = require('bcoin')
const chain = new bcoin.chain({
  db: 'leveldb',
  name: 'spvchain',
  location: __dirname + '/db/spvchain',
  spv: true
})

const pool = new bcoin.pool({
  chain: chain,
  spv: true,
  size: 1,
  maxPeers: 1,
  seeds: ['dctrl.ca']
})

if (process.env.DEBUG) {
  pool.logger.level = 4
}

pool.open().then(function() {
  pool.connect()
  pool.startSync()

  pool.watchAddress('1F2hpMerNN4A7LoNyJMqbfa1gZ8R13mVgQ')

  pool.on('tx', function(tx) {
    let total = 0
    for (let i = 0; i < tx.outputs.length; i++) {
      let output = tx.outputs[i]
      if (output.getAddress().toBase58() == '1F2hpMerNN4A7LoNyJMqbfa1gZ8R13mVgQ') {
        total += (output.value / 100000000).toFixed(8)
      }
    }
    console.log('Received ' + total + '\n')
    exec('loop_test.sh', function (error, stdout, stderr) {
      console.log(stdout);
    })
  })

  pool.on('error', function(err) {
    if (process.env.DEBUG) {
      console.log(err)
    }
  })
})

