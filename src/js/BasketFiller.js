const saleCoef = 287 / 300

window.onload = loadBasket

const recommendedSlaves = document
    .getElementsByClassName("shop-may-be-useful__items")[0]
    .getElementsByTagName("li")


function loadBasket() {

    if (!window.location.pathname.endsWith("BasketPage.html")) {
        return
    }

    const slavesInBasket = document
        .getElementsByClassName("shop-box-basket-items")[0]
    const slavesCalculations = document
        .getElementsByClassName("shop-box-calculator")[0]
        .getElementsByTagName("ol")[0]

    if (localStorage.getItem("n") == null) {
        localStorage.setItem("n", "2")
    }

    let n = parseInt(localStorage.getItem("n"))

    for (let i = 2; i < n; i++) {

        let currentSlaveTemplate = renderItemFromLocalStorage(i + 1)
        let currentPriceTemplate = renderItemPriceFromLocalStorage(i + 1)

        slavesInBasket.insertAdjacentHTML("beforeend", currentSlaveTemplate)

        slavesCalculations.insertAdjacentHTML("beforeend", currentPriceTemplate)

        updateCalculations()
    }
}

function addSlaveToBasket(elementNumber) {

    if (localStorage.getItem("n") == null) {
        localStorage.setItem("n", "2")
    }

    let n = parseInt(localStorage.getItem("n"))

    let slaveToAdd = recommendedSlaves[elementNumber - 1]

    let slaveTemplate = renderItemFromElement(slaveToAdd, n + 1)
    let priceTemplate = renderItemPrice(slaveToAdd)

    if (!window.location.pathname.endsWith("BasketPage.html")) {
        localStorage.setItem("n", String(n + 1));
        featureNotifier("add_to_basket")
        return
    }

    const slavesInBasket = document
        .getElementsByClassName("shop-box-basket-items")[0]
    const slavesCalculations = document
        .getElementsByClassName("shop-box-calculator")[0]
        .getElementsByTagName("ol")[0]

    slavesInBasket.insertAdjacentHTML("beforeend", slaveTemplate)

    slavesCalculations.insertAdjacentHTML("beforeend", priceTemplate[0])

    updateCalculations()

    localStorage.setItem("n", String(n + 1));

    featureNotifier("add_to_basket")
}

function removeSlaveFromBasket(elementNumber) {

    if (!window.location.pathname.endsWith("BasketPage.html")) {
        return
    }

    if (localStorage.getItem("n") == null) {
        localStorage.setItem("n", "2")
    }

    let id = parseInt(localStorage.getItem("n"))
    if (id === 2) {
        return
    }

    let basketEntities = localStorage.getItem("basketEntities")
    basketEntities = JSON.parse(basketEntities)

    if (basketEntities.length === 1) {
        basketEntities = []
    } else {
        for (let elem in basketEntities) {

            let basketEntity = basketEntities[elem]
            if (basketEntity.id === elementNumber) {
                basketEntities.splice(elem, elem)
                break;
            }
        }
    }

    localStorage.setItem("basketEntities", JSON.stringify(basketEntities))

    const slavesInBasket = document
        .getElementsByClassName("shop-box-basket-items")[0]
    const slavesCalculations = document
        .getElementsByClassName("shop-box-calculator")[0]
        .getElementsByTagName("ol")[0]

    slavesInBasket.getElementsByClassName("shop-box-basket-item")[elementNumber - 1].remove()

    slavesCalculations.getElementsByClassName("shop-box-calculator-list-element")[elementNumber - 1].remove()

    updateCalculations()

    localStorage.setItem("n", String(id - 1));

    featureNotifier("remove_from_basket")
}

function renderItemFromElement(element, elementNumber) {

    if (localStorage.getItem("n") == null) {
        localStorage.setItem("n", "2")
    }

    let id = parseInt(localStorage.getItem("n"))

    let imgSourceSplit = element
        .getElementsByClassName("shop-may-be-useful__item-picture")[0]
        .src.split("/")
    let imgName = imgSourceSplit[imgSourceSplit.length - 1]
    let name = element.getElementsByClassName("shop__text")[0].textContent.trimStart().trimEnd()
    let price = parseInt(element.getElementsByClassName("shop__text")[1].textContent)
    let defaultPrice = Math.floor(price / saleCoef)

    let basketEntity = new Object({
        id: id + 1,
        img: imgName,
        name: name,
        price: price,
        defaultPrice: defaultPrice,
    })

    let basketEntities = localStorage.getItem("basketEntities")


    if (basketEntities == null) {
        basketEntities = [
            basketEntity
        ]
    } else {
        basketEntities = JSON.parse(basketEntities)
        basketEntities.push(basketEntity)
    }

    localStorage.setItem("basketEntities", JSON.stringify(basketEntities))

    return '<li class="shop-box-basket-item">\n' +
        '                        <ul class="shop-box-basket-item-body">\n' +
        '                            <li>\n' +
        '                                <img src="../images/' + imgName + '" class="shop-box-basket-item-body__img" alt="ItemPhoto">\n' +
        '                            </li>\n' +
        '                            <li class="shop-box-basket-item-body__name">\n' +
        '                                <p class="shop__text">\n' +
        '                                    ' + name + "\n" +
        '                                </p>\n' +
        '                            </li>\n' +
        '                            <li class="shop-box-basket-item-body-price-info">\n' +
        '                                <ul class="shop-box-basket-item-body-price-info-body">\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body__upper-info">\n' +
        '                                        <p class="shop__text--red">\n' +
        '                                            ' + price + "$\n" +
        '                                        </p>\n' +
        '                                        <p class="shop__text">\n' +
        '                                            Price with store card\n' +
        '                                        </p>\n' +
        '                                    </li>\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body__lower-info">\n' +
        '                                        <p class="shop__text">\n' +
        '                                            ' + defaultPrice + "$\n" +
        '                                        </p>\n' +
        '                                        <p class="shop__text">\n' +
        '                                            Standard price\n' +
        '                                        </p>\n' +
        '                                    </li>\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body-links">\n' +
        '                                        <ul class="shop-box-basket-item-body-price-info-body-links__body">\n' +
        '                                            <li class="shop-box-basket-item-body-price-info-body-links-body__element">\n' +
        '                                               <a href="##" class="shop-box-basket-item-body-price-info-body-links-body__link">\n' +
        '                                                   <img class="shop-box-basket-item-body-price-info-body-links-body-element__img"\n' +
        '                                                       src="../images/TrashBinIcon.png" alt="TrashBin" onclick="removeSlaveFromBasket(' + elementNumber + ')">\n' +
        '                                               </a>\n' +
        '                                            </li>\n' +
        '                                            <li class="shop-box-basket-item-body-price-info-body-links-body__element">\n' +
        '                                               <a href="#" class="shop-box-basket-item-body-price-info-body-links-body__link">\n' +
        '                                                   <img class="shop-box-basket-item-body-price-info-body-links-body-element__img"\n' +
        '                                                       src="../images/HeartIcon.png" alt="Like">\n' +
        '                                               </a>\n' +
        '                                            </li>\n' +
        '                                        </ul>\n' +
        '                                    </li>\n' +
        '                                </ul>\n' +
        '                            </li>\n' +
        '                        </ul>\n' +
        '                '
}

function renderItemFromLocalStorage(elementNumber) {

    let elements = JSON.parse(localStorage.getItem("basketEntities"))

    let basketEntity;
    for (let elem in elements) {
        elem = elements[elem]
        if (elem.id === elementNumber) {
            basketEntity = elem
            break;
        }
    }

    let img = basketEntity.img
    let name = basketEntity.name
    let price = basketEntity.price
    let defaultPrice = basketEntity.defaultPrice

    return '<li class="shop-box-basket-item">\n' +
        '                        <ul class="shop-box-basket-item-body">\n' +
        '                            <li>\n' +
        '                                <img src="../images/' + img + '" class="shop-box-basket-item-body__img" alt="ItemPhoto">\n' +
        '                            </li>\n' +
        '                            <li class="shop-box-basket-item-body__name">\n' +
        '                                <p class="shop__text">\n' +
        '                                    ' + name + "\n" +
        '                                </p>\n' +
        '                            </li>\n' +
        '                            <li class="shop-box-basket-item-body-price-info">\n' +
        '                                <ul class="shop-box-basket-item-body-price-info-body">\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body__upper-info">\n' +
        '                                        <p class="shop__text--red">\n' +
        '                                            ' + price + "$\n" +
        '                                        </p>\n' +
        '                                        <p class="shop__text">\n' +
        '                                            Price with store card\n' +
        '                                        </p>\n' +
        '                                    </li>\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body__lower-info">\n' +
        '                                        <p class="shop__text">\n' +
        '                                            ' + defaultPrice + "$\n" +
        '                                        </p>\n' +
        '                                        <p class="shop__text">\n' +
        '                                            Standard price\n' +
        '                                        </p>\n' +
        '                                    </li>\n' +
        '                                    <li class="shop-box-basket-item-body-price-info-body-links">\n' +
        '                                        <ul class="shop-box-basket-item-body-price-info-body-links__body">\n' +
        '                                            <li class="shop-box-basket-item-body-price-info-body-links-body__element">\n' +
        '                                               <a href="##" class="shop-box-basket-item-body-price-info-body-links-body__link">\n' +
        '                                                   <img class="shop-box-basket-item-body-price-info-body-links-body-element__img"\n' +
        '                                                       src="../images/TrashBinIcon.png" alt="TrashBin" onclick="removeSlaveFromBasket(' + elementNumber + ')">\n' +
        '                                               </a>\n' +
        '                                            </li>\n' +
        '                                            <li class="shop-box-basket-item-body-price-info-body-links-body__element">\n' +
        '                                               <a href="#" class="shop-box-basket-item-body-price-info-body-links-body__link">\n' +
        '                                                   <img class="shop-box-basket-item-body-price-info-body-links-body-element__img"\n' +
        '                                                       src="../images/HeartIcon.png" alt="Like">\n' +
        '                                               </a>\n' +
        '                                            </li>\n' +
        '                                        </ul>\n' +
        '                                    </li>\n' +
        '                                </ul>\n' +
        '                            </li>\n' +
        '                        </ul>\n' +
        '                '
}

function renderItemPrice(element) {

    let name = element.getElementsByClassName("shop__text")[0].textContent
    let price = element.getElementsByClassName("shop__text")[1].textContent

    return [
        '<li class="shop-box-calculator-list-element">\n' +
        '                        <div class="shop-box-calculator-list-element__first">\n' +
        '                            <p class="shop__text">\n' +
        '                                ' + name + "\n" +
        '                            </p>\n' +
        '                        </div>\n' +
        '                        <div class="shop-box-calculator-list-element__second">\n' +
        '                            <p class="shop__text--red">\n' +
        '                                ' + price + "\n" +
        '                            </p>\n' +
        '                        </div>\n' +
        '                    </li>',

        price
    ]
}

function renderItemPriceFromLocalStorage(elementNumber) {

    let elements = JSON.parse(localStorage.getItem("basketEntities"))

    let basketEntity;
    for (let elem in elements) {
        elem = elements[elem]
        if (elem.id === elementNumber) {
            basketEntity = elem
            break;
        }
    }

    let name = basketEntity.name
    let price = basketEntity.price

    return '<li class="shop-box-calculator-list-element">\n' +
        '                        <div class="shop-box-calculator-list-element__first">\n' +
        '                            <p class="shop__text">\n' +
        '                                ' + name + "\n" +
        '                            </p>\n' +
        '                        </div>\n' +
        '                        <div class="shop-box-calculator-list-element__second">\n' +
        '                            <p class="shop__text--red">\n' +
        '                                ' + price + "\n" +
        '                            </p>\n' +
        '                        </div>\n' +
        '                    </li>'

}

function updateCalculations() {

    const slavesCalculations = document
        .getElementsByClassName("shop-box-calculator")[0]
        .getElementsByTagName("ol")[0]
    const slavesSubtotal = document
        .getElementsByClassName("shop-box-calculator-subtotal")[0]

    let subtotal = 0
    let youSave = 0
    for (let i = 0; i < slavesCalculations.children.length; i++) {
        let textPrice = slavesCalculations.children[i].getElementsByClassName("shop__text--red")[0].textContent
        let currentPrice = parseInt(textPrice)
        let defaultPrice = Math.floor(currentPrice / saleCoef)
        subtotal += currentPrice
        youSave += defaultPrice - currentPrice
    }

    slavesSubtotal.getElementsByClassName("shop__text")[1].textContent = subtotal + "$"

    slavesSubtotal.getElementsByClassName("shop__text--red")[0].textContent = youSave + "$"
}
