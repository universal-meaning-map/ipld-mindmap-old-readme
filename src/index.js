//const createNode = require ('./createNode.js')
const IPFS = require('ipfs')
let ipfs
const data = {
    name: 'Unga'
}

function createNode(callback) {
    ipfs = new IPFS()
    ipfs.on('start', () => {
        onStart(ipfs)
    })

}

function onStart(ipfs) {
    ipfs.dag.put(data, { format: 'dag-cbor', hashAlg: 'sha2-256' }, onPut)
}

function onPut(err, cid) {
    if (err) throw err

    ipfs.dag.get(cid, (err, dag) => {
        if (err) throw err
        console.log(JSON.stringify(dag.value))
    })
}

function onGet(err, dag) {
    if (err) throw err

    console.log(JSON.stringify(result.value))
}


createNode()