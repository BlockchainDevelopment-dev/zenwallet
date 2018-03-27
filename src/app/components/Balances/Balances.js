import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import autobind from 'class-autobind'
import {Link} from 'react-router-dom'
import Flexbox from 'flexbox-react'
import {truncateString, normalizeTokens} from '../../../utils/helpers'
const {clipboard} = require('electron')

import Layout from '../UI/Layout/Layout'
import CopyableTableCell from '../UI/CopyableTableCell'

@inject('balances')
@observer
class Balances extends Component {
  constructor() {
    super()
    this.state = {
      copyText: 'Copy'
    }
    autobind(this)
  }

  componentDidMount() {
    const {balances} = this.props
    balances.fetch()
  }

  copyToClipboard = (string) => {
    clipboard.writeText(string)
    this.setState({copyText: 'Copied to Clipboard'})
    setTimeout(() => {
      this.setState({copyText: 'Copy'})
    }, 1250)
  }

  render() {
    const {balances} = this.props
    const {copyText} = this.state

    const balancesRows = balances.assets.map(asset => {
      const assetName = balances.getAssetName(asset.asset)
      let fullBalanceForTitle
      if (assetName == 'ZENP') {
        fullBalanceForTitle = `${asset.balance.toLocaleString()} Kalapas`
      } else {
        fullBalanceForTitle = asset.balance.toLocaleString()
      }
      const truncatedAsset = truncateString(asset.asset)
      return (
        [
          <tr key={asset.asset}>
            <td className='align-left text' title={assetName} >{assetName}</td>
            <CopyableTableCell string={asset.asset} />
            <td className='bright-blue' title={fullBalanceForTitle} >{normalizeTokens(asset.balance)}</td>
            <td className='align-right' >
              <Link className='button small with-icon' to={`/send-tx/${asset.asset}`} title="Send Transaction">
                <i className="fa fa-paper-plane"></i> <span className='button-text'>Send</span>
              </Link>
            </td>
          </tr>,
          <tr className="separator" />
        ]
      )
    })

    return (
      <Layout className="balances">

        <Flexbox className='page-title'>
          <h1>Portfolio</h1>
        </Flexbox>

        <Flexbox className="balance-list">
          <table>
            <thead>
              <tr>
                <th className='align-left'>Asset Name</th>
                <th className='align-left'>Hash</th>
                <th className='align-left'>Balance</th>
                <th className='align-right'>Actions</th>
              </tr>
              <tr className="separator" />
            </thead>
            <tbody>
              {balancesRows}
            </tbody>
          </table>
        </Flexbox>

    </Layout>
  )
}
}

export default Balances
