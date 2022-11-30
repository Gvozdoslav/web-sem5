let currentIndex = 0
const j = 3

const dots = document.getElementsByClassName("shop-box-spinner__page")
const images = document.getElementsByClassName('shop-box-spinner__img')

window.addEventListener("load", init)

function init() {

    for (let k = 0; k < j; k++) {
        images[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    images[0].style['display'] = 'flex'
    dots[0].style['background-color'] = '#a7ccba'
}

function next() {

    for (let k = 0; k < j; k++) {
        images[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    images[(currentIndex + 1) % j].style['display'] = 'flex'
    dots[(currentIndex + 1) % j].style['background-color'] = '#a7ccba'

    currentIndex = (currentIndex + 1) % j
}

function prev() {

    for (let k = 0; k < j; k++) {
        images[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    images[(currentIndex + j - 1) % j].style['display'] = 'flex'
    dots[(currentIndex + j - 1) % j].style['background-color'] = '#a7ccba'

    currentIndex = (currentIndex - 1) % j
}

function dot(n) {

    for (let k = 0; k < j; k++) {
        images[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    images[n - 1].style['display'] = 'flex'
    dots[n - 1].style['background-color'] = '#a7ccba'

    currentIndex = n - 1
}