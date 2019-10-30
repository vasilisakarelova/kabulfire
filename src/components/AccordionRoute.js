import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

export default ({component: Component, data, ...rest}) => {
  let copy = rest
  if (rest.path === '/records') {
    copy.path = "/(|records)/"
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
