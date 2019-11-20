import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import Marquee3k from 'marquee3000'
import { createBrowserHistory } from 'history'

import AccordionRoute from './components/AccordionRoute'
import AccortionLink from './components/AccordionLink'

import Records from './components/Records'
import DeepFried from './components/DeepFried'
import Publishing from './components/Publishing'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.updateRouteState = this.updateRouteState.bind(this)

    let prevPath = window.location.pathname

    this.customHistory = createBrowserHistory({basename: '/getdeveloped'})
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
        window.MARQUEES[1].paused = false
        window.MARQUEES[0].paused = true
      }

      if (this.state.showClickHint) {
        this.setState({
          showClickHint: false
        })
      }
    });

    this.state = {
      documentHasFocus: document.hasFocus(),
      location: this.customHistory.location.pathname,
      prevPath,
      showClickHint: true
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
    } else if (this.state.location === '/records' || this.state.location === '/') {
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
    const { records, records_intro, legal_info, publishings, publishings_intro, deepFried, deepFried_intro } = this.props.data

    return (
      <Router history={this.customHistory} forceRefresh={!supportsHistory}>
        <div className='main-wrap'>
          <div className='main-inner'>
            <AccortionLink currentPath={this.state.location} to="/records">Records</AccortionLink>
            <AccordionRoute history={this.customHistory} exact path="/records" component={Records} data={records} intro={records_intro} legal={legal_info} showClickHint={this.state.showClickHint} />

            <AccortionLink currentPath={this.state.location} to="/publishing">Publishing</AccortionLink>
            <AccordionRoute history={this.customHistory} path="/publishing" component={Publishing} data={publishings} intro={publishings_intro} />

            <AccortionLink currentPath={this.state.location} to="/deep-fried">Deep Fried</AccortionLink>
            <AccordionRoute history={this.customHistory} path="/deep-fried" component={DeepFried} data={deepFried} intro={deepFried_intro} />
          </div>
        </div>
      </Router>
    )
  }
}
