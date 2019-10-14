import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import AnimateHeight from 'react-animate-height'
/* Bounce animation is dependent on animate.css library.
Source: https://github.com/daneden/animate.css */
import 'animate.css/source/_base.css'
import 'animate.css/source/bouncing_entrances/bounceInDown.css'

export default ({component: Component, data, ...rest}) => {
  let copy = rest
  let pathName = rest.path.replace(/\\|\//g,'')
  if (rest.path === '/records') {
    copy.path = "/(|records)/"
    pathName = 'records'
  }

  return (
    <Route {...copy} children={ ({match}) => {
      return (
        <CSSTransition in={match !== null}
          timeout={{
            enter: 500,
            exit: 500
          }}
          appear
          classNames="page-transition"
        >
          <Component data={data} match={match} />
        </CSSTransition>
      )
    }}>
  </Route>
);
}
