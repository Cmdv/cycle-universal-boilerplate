import {h, create} from 'virtual-dom'
try {
  var TweenMax = require('../../node_modules/gsap/src/uncompressed/TweenMax') // eslint-disable-line
} catch (e) {
  console.log('')
}

const GSAPWidget = function GSAPWidget({to, from, time}, children) {
  if (!time && typeof time !== 'number') {
    throw new Error('GSAP Widget requires a time')
  }
  if (!to) {
    throw new Error('GSAP Widget requires a "to" property')
  }

  this.time = time
  this.to = to
  this.from = from || null
  this.children = children
  this.key = Math.random() * 100
}

GSAPWidget.prototype.type = 'Widget'

GSAPWidget.prototype.init = function init() {
  let _div = h('div', {key: this.key}, this.children)

  try {
    let div = create(_div)
    if (this.from) {
      TweenMax.fromTo(div, this.time, this.from, this.to)
    } else {
      TweenMax.to(div, this.time, this.to)
    }
    return div
  } catch(e) {
    // Server-side
    return _div
  }
}

GSAPWidget.prototype.update = function update(previous) {
  if (this.compareToPrevious(previous)) {
    this.init()
  }
  return previous.vnode
}

GSAPWidget.prototype.compareToPrevious = function compareToPrevious(previous) {
  if (previous.children !== this.children) {
    return true
  }
  if (previous.from !== this.from) {
    return true
  }
  if (previous.to !== this.to) {
    return true
  }
  if (previous.time !== this.time) {
    return true
  }
  return false
}

const GSAP = (options, children) => {
  return new GSAPWidget(options, children)
}

export default GSAP
export {GSAP}
