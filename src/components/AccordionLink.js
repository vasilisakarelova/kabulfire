import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as css from 'classnames'

const AccordtionLink = (props) => {
  const currentPath = props.location.pathname
  const url = props.to
  const to = url.split('/')[1]

  return (
    <div className={css('nav--link-wrap', [`nav--link-${to}`])}>
      <Link to={`/${to}`} className='nav--link'>
        {props.children}
      </Link>
    </div>
  );
}

export default withRouter(AccordtionLink);
