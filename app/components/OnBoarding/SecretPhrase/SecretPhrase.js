import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Flexbox from 'flexbox-react'
import Checkbox from 'rc-checkbox'
import bip39 from 'bip39'
import history from '../../../services/history'

import OnBoardingLayout from '../Layout/Layout'

@inject('secretPhraseState')
@observer
class SecretPhrase extends Component {
  state = {
    checked: false,
  }

  componentWillMount() {
    const { secretPhraseState } = this.props
    const mnemonicPhrase = bip39.generateMnemonic(256).split(' ')
    const mnemonicPhraseWithStatuses = mnemonicPhrase.map(word => (
      { word, status: '', userInput: '' }
    ))

    secretPhraseState.mnemonicPhrase = mnemonicPhraseWithStatuses
  }

  onToggleSecuredPassphrase = (evt) => {
    this.setState({ checked: evt.target.checked })
  }

  onNextClicked = () => {
    history.push('/secret-phrase-quiz')
  }

  render() {
    const { checked } = this.state
    const { mnemonicPhrase } = this.props.secretPhraseState
    return (
      <OnBoardingLayout className="secret-phrase-container" progressStep={2}>
        <h1>Your mnemonic passphrase</h1>
        <h3>Write down the following words in cheonological order and save it in a safe place.</h3>
        <div className="devider after-title" />
        <ol className="passphrase">
          {mnemonicPhrase.map((word, idx) => (<li key={idx}>{word.word}</li>))}
        </ol>
        <p className="warning">If you lose this phrase you will lose your Zen tokens!</p>
        <div className="devider before-buttons" />

        <Flexbox flexDirection="row">
          <Flexbox flexGrow={1} flexDirection="row">
            <label className="checkbox">
              <Checkbox type="checkbox" checked={checked} onChange={this.onToggleSecuredPassphrase} />
              <span className="checkbox-text">
                &nbsp; I saved my passphrase and it’s secure
              </span>
            </label>
          </Flexbox>
          <Flexbox flexGrow={2} />
          <Flexbox flexGrow={1} justifyContent="flex-end" flexDirection="row">
            <Link className="button secondary" to="/import-or-create-wallet">Back</Link>
            <button disabled={!checked} className="button-on-right" onClick={this.onNextClicked}>Next</button>
          </Flexbox>
        </Flexbox>

      </OnBoardingLayout>
    )
  }
}

export default SecretPhrase
