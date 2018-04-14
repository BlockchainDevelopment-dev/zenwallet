import BalancesState from './balances-state'
import PublicAddressState from './public-address-state'
import TransactionState from './transaction-state'
import TxHistoryState from './tx-history-state'
import ContractState from './contract-state'
import ContractMessage from './contract-message'
import ActiveContractSetState from './acs-state'
import NetworkState from './network-state'
import RedeemTokensState from './redeem-tokens-state'
import SecretPhraseState from './secret-phrase-state'

const secretPhraseState = new SecretPhraseState()
const balances = new BalancesState()
const publicAddress = new PublicAddressState()
const transaction = new TransactionState(secretPhraseState)
const txhistory = new TxHistoryState()
const contract = new ContractState(secretPhraseState)
const contractMessage = new ContractMessage(secretPhraseState)
const activeContractSet = new ActiveContractSetState()
const networkState = new NetworkState()
const redeemTokensState = new RedeemTokensState()

export default {
  balances,
  publicAddress,
  transaction,
  txhistory,
  contract,
  contractMessage,
  activeContractSet,
  networkState,
  redeemTokensState,
  secretPhraseState,
}