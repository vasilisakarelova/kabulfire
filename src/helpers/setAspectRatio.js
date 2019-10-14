export default (img,parent) => {
  const padding = ( img.naturalHeight / img.naturalWidth ) * 100
  img.parentNode.style.paddingTop = `${padding}%`

  const revealImg = () => {
    if (img.getBoundingClientRect().top <= window.innerHeight * .8) {
      img.style.opacity = 1
      parent.removeEventListener('scroll', revealImg)
    }
  }

  parent.addEventListener('scroll', revealImg)
}
