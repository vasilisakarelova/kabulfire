import React, { Component } from 'react'
import * as css from 'classnames'

export default class extends Component {
  state = {
    isPlaying: false,
    loaded: false,
    stopAll: false
  }

  handlePlay = (mediaIdx) => {
    this[`plyr-${mediaIdx}`].playVideo()
    this.refs[`plyr-placeholder-${mediaIdx}`].style.opacity = '0'
    this.refs[`plyr-placeholder-${mediaIdx}`].style.zIndex = '-1'

    this.setState({
      isPlaying: true
    })
  }

  onEndPlay = (mediaIdx) => {
    const index = this.state.isPlaying.indexOf(mediaIdx)
    this.refs[`plyr-placeholder-${mediaIdx}`].style.opacity = '1'
    this.refs[`plyr-placeholder-${mediaIdx}`].style.zIndex = ''

    this.setState({
      isPlaying: false
    })
  }

  stopVideo = () => {
    if (this[`plyr-${this.props.mediaIdx}`] !== undefined) this[`plyr-${this.props.mediaIdx}`].pauseVideo()

    this.setState({
      isPlaying: false
    })
  }

  componentDidMount() {
    if (this.props.mediaIdx === 0) {
      this.setUp()
    }
  }

  setUp = () => {
    if (window.YT === undefined) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'

      window.onYouTubeIframeAPIReady = this.loadVideo

      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    } else {
      this.loadVideo()
    }
  }

  loadVideo = () => {
    const id = this.props.media[this.props.type].split('?v=')[1].split('&')[0]

    this[`plyr-${this.props.mediaIdx}`] = new window.YT.Player(`plyr-${this.props.mediaIdx}`, {
      videoId: id,
      width: '100%',
      height: '100%',
      playerVars: {
        controls: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onStateChange
      },
    })
  }

  onPlayerReady = (ev) => {
    this.refs.button.addEventListener('click', () => {
      if(this[`plyr-${this.props.mediaIdx}`] !== undefined) this.handlePlay(this.props.mediaIdx)
    })

    this.setState({
      loaded: true
    })
  }

  onStateChange = (ev) => {
    const id = parseInt(ev.target.i.id.split('plyr-')[1])

    switch(ev.data) {
      case 0:
        this.refs[`plyr-placeholder-${id}`].style.opacity = '1'
        this.refs[`plyr-placeholder-${id}`].style.zIndex = ''

        this.setState({
          isPlaying: false
        })
        break
      case 2:
        this.refs[`plyr-placeholder-${id}`].style.opacity = '1'
        this.refs[`plyr-placeholder-${id}`].style.zIndex = ''

        this.setState({
          isPlaying: false
        })
        break
      default:
        console.log('all good 👌🏼')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.scrolled[this.props.mediaIdx] <= window.innerHeight * .5 && this[`plyr-${this.props.mediaIdx}`] === undefined) {
      this.setUp()
    }

    if (!prevProps.stopAll && this.props.stopAll) {
      this.stopVideo()
    }
  }

  render () {
    const {type, media, mediaIdx} = this.props

    return (
      <div className='deep-fried--media-block' ref={this.props.blockRef}>
        <div className='deep-fried--media-name'>{media.title}</div>
        <div className='deep-fried--media-placeholder is-video' ref={this.props.plyrRef}>
          <div id={`plyr-${mediaIdx}`}></div>
          <img ref={`plyr-placeholder-${mediaIdx}`} src={`https://img.youtube.com/vi/${media[type].split('?v=')[1].split('&')[0]}/sddefault.jpg`}/>
          <div className={css('deep-fried--media-play-btn', {'is-hidden': this.state.isPlaying, 'is-loaded': this.state.loaded })} ref='button'>
            <svg width="100%" height="100%" viewBox="0 0 138 139" xmlns="http://www.w3.org/2000/svg">
              <circle cx="69" cy="69.8276" r="66" stroke="white" fill="transparent" strokeWidth="6"/>
              <path d="M53.5 42.9808L100 69.8276L53.5 96.6744L53.5 42.9808Z" stroke="white" fill="transparent" strokeWidth="5"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }
}
