import React, { Component } from 'react'
import { Router,Route } from 'react-router-dom'
import Marquee3k from 'marquee3000'
import { createBrowserHistory } from 'history'
import * as css from 'classnames'

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
    let isError = true

    this.customHistory = createBrowserHistory() //createBrowserHistory({basename: '/getdeveloped'})

    if (this.customHistory.location.pathname === '/'
      || this.customHistory.location.pathname === '/records'
      || this.customHistory.location.pathname === '/publishing'
      || this.customHistory.location.pathname === '/deep-fried') {
        isError = false
      }

    this.customHistory.listen(currentLocation => {
      this.updateRouteState(currentLocation.pathname, prevPath)
      prevPath = currentLocation.pathname

      if (currentLocation.pathname === '/deep-fried') {
        window.MARQUEES[2].paused = true
        window.MARQUEES[1].paused = false
        window.MARQUEES[0].paused = false
        this.setState({
          closeAll: false,
          isError: false
        })
      } else if (currentLocation.pathname === '/publishing') {
        window.MARQUEES[2].paused = false
        window.MARQUEES[1].paused = true
        window.MARQUEES[0].paused = false
        this.setState({
          closeAll: true,
          isError: false
        })
      } else if (currentLocation.pathname === '/records') {
        window.MARQUEES[2].paused = false
        window.MARQUEES[1].paused = false
        window.MARQUEES[0].paused = true
        this.setState({
          closeAll: true,
          isError: false
        })
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
      isError,
      showClickHint: true,
      closeAll: false
    }
  }

  componentDidMount () {
    if (this.customHistory.location.pathname !== '/records'
      && this.customHistory.location.pathname !== '/publishing'
      && this.customHistory.location.pathname !== '/deep-fried'
      && this.customHistory.location.pathname !== '/') {
        this.customHistory.push('/')
        this.setState({
          isError: false
        })
      }

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
          <div className={css('main-inner', {'is-error': this.state.isError})}>
            <AccortionLink currentPath={this.state.location} to="/records">Records</AccortionLink>
            <AccordionRoute history={this.customHistory} exact path="/records" component={Records} data={records} intro={records_intro} legal={legal_info} showClickHint={this.state.showClickHint} />

            <AccortionLink currentPath={this.state.location} to="/publishing">Publishing</AccortionLink>
            <AccordionRoute history={this.customHistory} path="/publishing" component={Publishing} data={publishings} intro={publishings_intro} />

            <AccortionLink currentPath={this.state.location} to="/deep-fried">Deep Fried</AccortionLink>
            <AccordionRoute history={this.customHistory} closeAll={this.state.closeAll} path="/deep-fried" component={DeepFried} data={deepFried} intro={deepFried_intro} />
          </div>
        </div>
      </Router>
    )
  }
}
