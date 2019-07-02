import bnc from 'bnc-assist'

let initializedAssist

// Assist methods
export const initializeAssist = web3 => getAssist(web3) // Call this function as soon as web3 is initialized
export const onboardUser = () => getAssist().onboard()
export const decorateContract = contract => getAssist().Contract(contract)
export const decorateTransaction = txObject => getAssist().Transaction(txObject)
export const getUserState = () => getAssist().getState()

// Returns initialized assist object if previously initialized.
// Otherwise will initialize assist with the config object
export function getAssist(web3) {
  if (!initializedAssist) {
    console.log('init blocknative with this .env network', process.env.REACT_APP_NETWORK)
    initializedAssist = bnc.init(
      {
        networkId: process.env.REACT_APP_NETWORK || 1,
        dappId: 'e2a594cc-3603-4d3e-8f20-ad75a55e93c', // from https://accounts.blocknative.com
        web3,
        messages: { // optional custom notification text handlers, see documentation
          txSent: txSentMsg,
          txPending: txPendingMsg,
          txConfirmed: txConfirmedMsg,
          txFailed: txFailedMsg
        },
        style: {
          darkMode: true // optional style settings, see documentation
        }
      }
    )
  }
  
  return initializedAssist
}

function txSentMsg(data) {
  // return a global message for transaction sent event
  // data contains transaction/contract context, see documention for details
  // e.g.
  let highFiveContract = data.contract && data.contract.methodName === 'highFive'
  return highFiveContract ? 'Sending a High Five... 👋' : 'Sending some ETH...'
}

function txPendingMsg(data) {
  // return a global message for transaction pending event
  // data contains transaction/contract context, see documention for details
  // e.g.
  let highFiveContract = data.contract && data.contract.methodName === 'highFive'
  return highFiveContract ? 'Your High Five is pending... 👋' : 'Your sending of ETH is pending...'
}

function txConfirmedMsg(data) {
  // return a global message for transaction confirmed event
  // data contains transaction/contract context, see documention for details
  // e.g.
  let highFiveContract = data.contract && data.contract.methodName === 'highFive'
  return highFiveContract ? 'High Five successful! 👋' : 'Your ETH was sent!'
}

function txFailedMsg(data) {
  // return a global message for transaction failed event
  // data contains transaction/contract context, see documention for details
  let highFiveContract = data.contract && data.contract.methodName === 'highFive'
  return highFiveContract ? 'Your High Five failed! 😞' : 'Your sending of ETH failed!'
}