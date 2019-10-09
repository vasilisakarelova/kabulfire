import React from 'react'
import { Link } from 'react-router-dom'

export default ({ location }) => {
  const url = (location === '/deep-fried') ? '/' : '/deep-fried'

  return (
    <div className="nav nav--top">
      <Link
        to={{
          pathname: url,
          state: { prev: true },
        }} className="nav__link" >
        Deep fried
      </Link>
    </div>
  );
}
