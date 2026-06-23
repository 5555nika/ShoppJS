import { ERROR_SERVER, PRODUCT_INFORMATION_NOT_FOUND } from "../../constans"
import { checkingRelavanceValueBasket, showErrorMessage } from "../../utils"

export interface IProduct {
    id: number,
    img: string,
    title: string,
    price: number,
    discount: number,
    descr: string
}

const wrapper = document.querySelector<HTMLElement>('.wrapper')
const productsCard: IProduct[] = []

getProductsCard()

async function getProductsCard () {
    try {
        if (!productsCard.length) {
            const response = await fetch('/products.json')
            if (!response.ok) {
            throw new Error(response.statusText)
            }
            const data  = await response.json()
            render(data)
        } 
    } catch (e) {
        showErrorMessage(ERROR_SERVER)
        console.log(e instanceof Error ? e.message : 'error')
    } 

}

    function getParams (parameter: string) {
        const params = new URLSearchParams(window.location.search)
        return params.get(parameter)
}

    function render (data: IProduct[]) {
    if (!data || data.length === 0) {
        showErrorMessage(ERROR_SERVER)
        return
    }

    checkingRelavanceValueBasket(data)

    const productId = Number(getParams('id'))

    if (!productId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
    }

    const product = data.find(item => item.id === productId)
    if (!product) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return
    }
    renderInfoProduct(product)
    }


function renderInfoProduct(product: IProduct) {
    const { img, title, price, discount, descr } = product;
    const priceDiscount = Math.round(price - ((price * discount) / 100));
    const productItem = `
        <div class="product">
            <h2 class="product__title">${title}</h2>
                <div class="product__img">
                    <img src="${img}" alt="${title}">
                </div>
                <p class="product__descr">${descr}</p>
                    <div class="product__inner-price">
                        <div class="product__price">
                            <b>Цена:</b> ${price} руб
                        </div>
                        <div class="product__price--discount">
                            <b>Цена со скидкой:</b> ${priceDiscount} руб
                        </div>
                    </div>
        </div>
    `;
    if (wrapper) {
        wrapper.insertAdjacentHTML('beforeend', productItem);
    }
}