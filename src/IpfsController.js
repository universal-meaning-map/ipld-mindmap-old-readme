//const createNode = require ('./createNode.js')
const IPFS = require('ipfs')
let ipfs
const data = {
    name: 'Unga'
}


//const hash = 'QmcDXEwVJoJ7G1bjhCFzo5Z6gtADS1qCHp8EA33NYqgJyK'
const hash = 'zdpuAvYJaZxBjTV4WH3irwThm5t2a7yTccoN9cWpDmtV4CiNz'

function createNode(callback) {
    ipfs = new IPFS()
   
    ipfs.on('start', () => {
        console.log (ipfs)
        onStart(ipfs)
    })
}

function onStart(ipfs) {
    //ipfs.dag.put(data, { format: 'dag-cbor', hashAlg: 'sha2-256' }, onPut)
    console.log('started')
    ipfs.dag.get(hash, (err, dag) => {
        if (err) throw err
        console.log(JSON.stringify(dag.value))
    })
}

function onPut(err, cid) {
    if (err) throw err

    ipfs.dag.get(cid, (err, dag) => {
        if (err) throw err
        console.log(JSON.stringify(dag.value))
    })
}

function onGet(err, result) {
    if (err) throw err

    console.log(JSON.stringify(result.value))
}


createNode()