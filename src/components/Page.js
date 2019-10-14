import React from 'react'
import PropTypes from 'prop-types'
import * as css from 'classnames'
import { withRouter } from 'react-router-dom'

function Page({
  children,
  name,
  match,
  pageRef
}) {
  return (
    <div className={css('page', {'page-transition-enter-done': match !== null, [`page${name}`]: name !== undefined } )}>
      <div className='page-inner' ref={pageRef}>
        {children}
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
};

Page.defaultProps = {
  background: '#223',
};

export default withRouter(Page);
