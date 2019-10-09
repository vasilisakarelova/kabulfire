import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import AnimateHeight from 'react-animate-height'
/* Bounce animation is dependent on animate.css library.
Source: https://github.com/daneden/animate.css */
import 'animate.css/source/_base.css'
import 'animate.css/source/bouncing_entrances/bounceInDown.css'

export default ({component: Component, data, ...rest}) => {
  const width = window.innerWidth < 984 ? 0 : 200
  console.log(width)
  return (
    <Route {...rest} children={ ({match}) => {
      return (
        <AnimateHeight duration={ 300 }
          applyInlineTransitions={false}
          height={  match !== null ? 'auto' : 200 }
          className={`page-wrap is-${rest.path.replace(/\\|\//g,'')}`}
          animationStateClasses={{
            animating: 'rah-animating',
            animatingUp: 'rah-animating--up',
            animatingDown: 'rah-animating--down',
            static: 'rah-static',
            animatingToHeightZero: 'rah-animating--to-height-zero',
            animatingToHeightAuto: 'rah-animating--to-height-auto',
            staticHeightZero: 'rah-static--height-zero',
            staticHeightAuto: 'rah-static--height-auto',
          }}
        >
          <CSSTransition in={match !== null}
            timeout={{
              enter: 1000,
              exit: 300
            }}
            appear={false}
            classNames="page-transition"
          >
            <Component data={data} />
          </CSSTransition>
        </AnimateHeight>
      )
    }}>
  </Route>
);
}
