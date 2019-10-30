import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as css from 'classnames'

const AccordtionLink = (props) => {
  const url = props.to
  const to = url.split('/')[1]
  const speed = (Math.random() * (0.14 - 0.45) + 0.45).toFixed(4)

  return (
    <div className={css('nav--link-wrap', [`nav--link-${to}`])}>
      <Link to={`/${to}`} className='nav--link marquee3k' data-speed={speed}>
        <span>{props.children} {props.children} {props.children} {props.children} {props.children} {props.children} {props.children} </span>
      </Link>
      <Link to={`/${to}`} className={css('nav--link-pseudo', {'is-inactive': props.currentPath === url})}></Link>
    </div>
  );
}

export default withRouter(AccordtionLink);
