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

pool.open().then(function() {
  db.keysAsync("user:*").then(function(keys) {
    return Promise.all(keys.map(function(key) {
      return db.hgetallAsync(key).then(function(user) {
        if (user.address) {
          pool.watchAddress(user.address)
          return users[user.address] = {
            email: user.email,
            currency: user.currency,
            symbol: user.symbol,
            phone: user.phone
          }
        }
      })
    }))
  })

  pool.connect().then(function() {
    pool.startSync()
  })

  pool.on('error', function(err) {
    console.log(err)
  })

  pool.on('tx', function(tx) {
    console.log('tx received')
  })
})

