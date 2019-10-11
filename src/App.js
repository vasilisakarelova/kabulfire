import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AccordionRoute from './components/AccordionRoute'
import AccortionLink from './components/AccordionLink'

import Records from './components/Records'
import DeepFried from './components/DeepFried'
import Publishing from './components/Publishing'
import Error404 from './components/Error404'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateRouteState = this.updateRouteState.bind(this)

    let prevPath = window.location.pathname

    this.customHistory = createBrowserHistory()
    this.customHistory.listen(currentLocation => {
      this.updateRouteState(currentLocation.pathname, prevPath)
      prevPath = currentLocation.pathname
    });

    this.state = {
      documentHasFocus: document.hasFocus(),
      location: this.customHistory.location.pathname,
      prevPath
    }
  }

  componentDidMount () {
    document.querySelector('.page-inner').style.opacity = 1
  }

  updateRouteState (location, prevPath) {
    this.setState({
      location,
      prevPath
    })
  }

  render () {
    const supportsHistory = 'pushState' in window.history

    return (
      <Router history={this.customHistory} forceRefresh={!supportsHistory}>
        <div className='main-wrap'>
          <div className='main-inner'>
            <AccortionLink to="/records">Records</AccortionLink>
            <AccordionRoute history={this.customHistory} exact path="/records" component={Records}/>

            <AccortionLink to="/publishing">Publishing</AccortionLink>
            <AccordionRoute history={this.customHistory} path="/publishing" component={Publishing}/>

            <AccortionLink to="/deep-fried">Deep Fried</AccortionLink>
            <AccordionRoute history={this.customHistory} path="/deep-fried" component={DeepFried}/>
          </div>
        </div>
      </Router>
    )
  }
}
