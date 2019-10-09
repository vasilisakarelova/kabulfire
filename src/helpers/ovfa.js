export default (el) => {
  var diff
  var tl = null

  function animate (scroll) {
    var obj = {scrollLeft: 0}

    ;(tl !== null) && tl.kill()
    tl = null

    tl = window.TweenMax.to(obj, diff / 60, {
      scrollLeft: diff,
      ease: window.Power0.easeNone,
      repeat: -1,
      yoyoEase: true,
      yoyo: true,
      onUpdate: function () { el.scrollLeft = obj.scrollLeft }
    })

    tl.totalDuration(diff / 60)
  }

  function update (ev) {
    if (el.clientWidth < el.scrollWidth) {
      if (el.querySelectorAll('img').length > 1 && window.innerWidth >= 1440) {
        const child = el.querySelector('img')
        el.querySelector('.main-block-slogan--scroll').removeChild(child)
      }

      diff = el.firstChild.scrollWidth - el.clientWidth

      animate(diff)
    } else if (el.clientWidth === el.scrollWidth) {
      const dupImg = el.querySelector('img').cloneNode(true)
      el.querySelector('.main-block-slogan--scroll').appendChild(dupImg)
      diff = el.firstChild.scrollWidth - el.clientWidth

      animate(diff)
    }
  }

  update()

  document.addEventListener('resized', update)
}
