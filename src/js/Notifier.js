window.onload = pageNotifier

function pageNotifier() {

    if (document.location.pathname.includes("LandingPage.html")) {
        iziToast.info({
            title: "Info",
            message: "You opened LandingPage",
            position: "bottomRight"
        })
    }

    if (document.location.pathname.includes("BasketPage.html")) {
        loadBasket()
        iziToast.info({
            title: "Info",
            message: "You opened BasketPage",
            position: "bottomRight"
        })
    }

    if (document.location.pathname.includes("ComparePage.html")) {
        iziToast.info({
            title: "Info",
            message: "You opened ComparePage",
            position: "bottomRight"
        })
    }

    if (document.location.pathname.includes("FavoritesPage.html")) {
        iziToast.info({
            title: "Info",
            message: "You opened FavoritesPage",
            position: "bottomRight"
        })
    }

    if (document.location.pathname.includes("Profile.html")) {
        iziToast.info({
            title: "Info",
            message: "You opened Profile",
            position: "bottomRight"
        })
    }

    if (document.location.pathname.includes("ItemPage.html")) {
        iziToast.info({
            title: "Info",
            message: "You opened ItemPage",
            position: "bottomRight"
        })
    }
}

function featureNotifier(context) {

    if (context.includes("may_be_useful")) {
        iziToast.warning({
            title: "Warning",
            message: "'May be useful' scrollbar is not implemented yet :(",
            position: "bottomRight"
        })
    }

    if (context.includes("add_to_basket")) {
        iziToast.success({
            title: "Success",
            message: "Item added to the shopping cart",
            position: "bottomRight"
        })
    }

    if (context.includes("remove_from_basket")) {
        iziToast.success({
            title: "Success",
            message: "Item removed from the shopping cart",
            position: "bottomRight"
        })
    }
}