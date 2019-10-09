import React from 'react'
import page from 'page'

import scrollBy from '../helpers/scrollBy'

export default (props) => {
  let classes = props.className

  const handleClick = (ev) => {
    ev.preventDefault()
    page(props.to)

    if (props.motion === 'scrollTop') {
      scrollBy(0, 400)
    }
  }

  if (props.currentPage === props.to) {
    classes += ' is-active'
  }

  return (
    <a href={ props.to } className={ classes } onClick={ handleClick }>{ props.children }</a>
  )
}
