
window.addEventListener("load", initPageIcon)

const pagesIcons = document.getElementsByClassName("shopHeader__pages")[0].getElementsByTagName("li")

function initPageIcon() {

    if (window.location.pathname === "/web/src/pages/ComparePage.html") {
        pagesIcons[0].getElementsByTagName("img")[0].src = "/web/src/images/ScalesActiveIcon.svg"
    }

    if (window.location.pathname === "/web/src/pages/FavoritesPage.html") {
        pagesIcons[1].getElementsByTagName("img")[0].src = "/web/src/images/HeartActive.svg"
    }

    if (window.location.pathname === "/web/src/pages/Profile.html") {
        pagesIcons[2].getElementsByTagName("img")[0].src = "/web/src/images/ProfileActiveIcon.svg"
    }

    if (window.location.pathname === "/web/src/pages/BasketPage.html") {
        pagesIcons[3].getElementsByTagName("img")[0].src = "/web/src/images/ShoppingCartActiveIcon.svg"
    }
}