let currentIndex = 0
const j = 3

const dots = document.getElementsByClassName("shop-box-spinner__page")
const offers = document.getElementsByClassName("shop-box-spinner-items")[0].getElementsByTagName("li")

window.addEventListener("load", init)

function init() {

    for (let k = 0; k < j; k++) {
        offers[k].classList.replace("shop-box-spinner-item", "shop-box-spinner-item--inactive")
        offers[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    offers[0].classList.replace("shop-box-spinner-item--inactive", "shop-box-spinner-item")
    offers[0].style['display'] = 'flex'
    dots[0].style['background-color'] = '#a7ccba'
}

function next() {

    for (let k = 0; k < j; k++) {
        offers[k].classList.replace("shop-box-spinner-item", "shop-box-spinner-item--inactive")
        offers[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    offers[(currentIndex + 1) % j].classList.replace("shop-box-spinner-item--inactive", "shop-box-spinner-item")
    offers[(currentIndex + 1) % j].style['display'] = 'flex'
    dots[(currentIndex + 1) % j].style['background-color'] = '#a7ccba'

    currentIndex = (currentIndex + 1) % j
}

function prev() {

    for (let k = 0; k < j; k++) {
        offers[k].classList.replace("shop-box-spinner-item", "shop-box-spinner-item--inactive")
        offers[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    offers[(currentIndex + j - 1) % j].classList.replace("shop-box-spinner-item--inactive", "shop-box-spinner-item")
    offers[(currentIndex + j - 1) % j].style['display'] = 'flex'
    dots[(currentIndex + j - 1) % j].style['background-color'] = '#a7ccba'

    currentIndex = (currentIndex - 1) % j
}

function dot(n) {

    for (let k = 0; k < j; k++) {
        offers[k].classList.replace("shop-box-spinner-item", "shop-box-spinner-item--inactive")
        offers[k].style['display'] = 'none'
        dots[k].style['background-color'] = '#D5F8E6'
    }

    offers[n - 1].classList.replace("shop-box-spinner-item--inactive", "shop-box-spinner-item")
    offers[n - 1].style['display'] = 'flex'
    dots[n - 1].style['background-color'] = '#a7ccba'

    currentIndex = n - 1
}