
window.addEventListener("load", initPageIcon)

const pagesIcons = document.getElementsByClassName("shopHeader__pages")[0].getElementsByTagName("li")

function initPageIcon() {

    console.log(window.location.pathname)
    if (window.location.pathname.endsWith("ComparePage.html")) {
        pagesIcons[0].getElementsByTagName("img")[0].src = "../../src/images/ScalesActiveIcon.svg"
    }

    if (window.location.pathname.endsWith("FavoritesPage.html")) {
        pagesIcons[1].getElementsByTagName("img")[0].src = "../../src/images/HeartActive.svg"
    }

    if (window.location.pathname.endsWith("Profile.html")) {
        pagesIcons[2].getElementsByTagName("img")[0].src = "../../src/images/ProfileActiveIcon.svg"
    }

    if (window.location.pathname.endsWith("BasketPage.html")) {
        pagesIcons[3].getElementsByTagName("img")[0].src = "../../src/images/ShoppingCartActiveIcon.svg"
    }
}