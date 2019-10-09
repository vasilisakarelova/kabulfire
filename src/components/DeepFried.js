import React, { Component } from 'react'
import {Helmet} from "react-helmet"
import Page from './Page'

export default class extends Component {
  render () {
    return (
      <Page name='-deep-fried'>
        <Helmet>
          <title>Kabulfire | DeepFried</title>
        </Helmet>
        <div className='deep-fried-inner'>
        </div>
      </Page>
    )
  }
}
