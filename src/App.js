import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import Marquee3k from 'marquee3000'
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

      if (currentLocation.pathname === '/deep-fried') {
        window.MARQUEES[2].paused = true
        window.MARQUEES[1].paused = false
        window.MARQUEES[0].paused = false
      } else if (currentLocation.pathname === '/publishing') {
        window.MARQUEES[2].paused = false
        window.MARQUEES[1].paused = true
        window.MARQUEES[0].paused = false
      } else if (currentLocation.pathname === '/records') {
        window.MARQUEES[2].paused = false
        window.MARQUEES[2].paused = false
        window.MARQUEES[0].paused = true
      }
    });

    this.state = {
      documentHasFocus: document.hasFocus(),
      location: this.customHistory.location.pathname,
      prevPath
    }
  }

  componentDidMount () {
    document.querySelector('.page-inner').style.opacity = 1

    Marquee3k.init({
      selector: 'marquee3k',
    })

    if (this.state.location === '/deep-fried') {
      window.MARQUEES[2].paused = true
    } else if (this.state.location === '/publishing') {
      window.MARQUEES[1].paused = true
    } else if (this.state.location === '/records') {
      window.MARQUEES[0].paused = true
    }
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
