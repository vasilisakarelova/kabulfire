import React from 'react';
import Modal from 'react-modal'

export default ({ isOpen, onRequestClose, data }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={{
        base: 'modal-base',
        afterOpen: 'modal-base_after-open',
        beforeClose: 'modal-base_before-close'
      }}
      overlayClassName={{
        base: 'overlay-base',
        afterOpen: 'overlay-base_after-open',
        beforeClose: 'overlay-base_before-close'
      }}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={400}
      >
      <div className='legal-info--wrap' id='yourAppElement'>
        <div className='legal-info--container'>
          <div className='legal-info--scroll'>
            <div className='legal-info' dangerouslySetInnerHTML={{ __html: data }}></div>
            <div className='legal-info--close' onClick={onRequestClose}>
            <svg width="100%" height="100%" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.16797 29L0.480467 29L10.7539 14.293L1.125 0.308595L5.98828 0.308596L13.3125 11.2852L20.5781 0.308599L25.207 0.308599L15.5781 14.293L25.6758 29L20.8516 29L13.1172 17.2031L5.16797 29Z" fill="black"/>
            </svg>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  )
}
