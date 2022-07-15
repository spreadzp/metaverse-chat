//const xrpl = require('xrpl');
//import xrpl from 'xrpl';
declare var xrpl;
export async function generateXrpAccount() {
  const getNet = () => {
    return "wss://s.altnet.rippletest.net:51233"
  }
let wallet = localStorage.getItem("wallet")
  let net = getNet()
  if (xrpl && !wallet) {
    console.log("🚀 ~ file: generateXrpAccount.ts ~ line 10 ~ generateXrpAccount ~ xrpl", xrpl)
    //   await connectXrpClient(xrpl)
    // }
    const client = new xrpl.Client(net)
    //const xrpClient = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    // setResults('Connecting to ' + net + '....')
    //await xrpClient.connect()

    let faucetHost = null
    // if (document.getElementById("xls").checked) {
    faucetHost = "faucet-nft.ripple.com"
    // }
    // if (type == 'standby') {
    //   document.getElementById('standbyResultField').value = results
    // } else {
    //   document.getElementById('operationalResultField').value = results
    // } 
    await client.connect()


    // setResults(results += '\nConnected, funding wallet.')
    const my_wallet = (await client.fundWallet(null, { faucetHost })).wallet
    console.log("🚀 ~ file: MapLand.js ~ line 150 ~ createAccount ~ my_wallet", my_wallet)
    window.localStorage.setItem("net", 'standby');
    window.localStorage.setItem("wallet", JSON.stringify(my_wallet));
    // setResults(results += '\nGot a wallet.')

    // -----------------------------------Get the current balance.



    const my_balance = client.getXrpBalance(my_wallet.address)
    console.log("🚀 ~ file: MapLand.js ~ line 151 ~ createAccount ~ my_balance", my_balance)
    client.disconnect()
    return my_wallet
  } else {
    console.log('first', wallet)
    return wallet;
  }
}