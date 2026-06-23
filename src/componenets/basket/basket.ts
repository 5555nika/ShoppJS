import { ERROR_SERVER, NO_ITEMS_CART } from "../../constans"
import { checkingRelavanceValueBasket, getLocalStorgeCart, setLocalStorageCart, showErrorMessage } from "../../utils"

export interface IProduct {
    id: number,
    img: string,
    title: string,
    price: number,
    discount: number,
    descr: string
}
const cartContainer = document.querySelector<HTMLElement>('.cart')
const productsCard: IProduct[] = []

cartContainer?.addEventListener('click', del)

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

    function render (data: IProduct[]) {
        if (!cartContainer) return
        cartContainer.innerHTML = ''

        if (!data || !data.length) {
            showErrorMessage(ERROR_SERVER)
            return
        }
        checkingRelavanceValueBasket(data)

        const basket = getLocalStorgeCart<number>() 
        if (!basket || !basket.length) {
            showErrorMessage(NO_ITEMS_CART)
            return
        }
        const product = data.filter(item => basket.includes(item.id))
        if (!product) {
            showErrorMessage(NO_ITEMS_CART)
            return
        }
        renderProductsInBasket(product)

    }

    function del (e: MouseEvent) {
        const target = e.target as HTMLElement
        const delBtn = target.closest<HTMLButtonElement>('.cart__del-cart')
        if (!delBtn) return
        const card = delBtn.closest<HTMLElement>('.cart__product')
        const id = Number(card?.dataset?.productId)

        let basket = getLocalStorgeCart<number>()
        basket = basket.filter((itemId: number) => itemId !== id )

        setLocalStorageCart(basket)
        getProductsCard()
    }

function renderProductsInBasket(arr: IProduct[]) {
    if (!cartContainer) return;
    
    arr.forEach(card => {
        const { id, img, title, price, discount } = card;
        const priceDiscount = Math.round(price - ((price * discount) / 100));       
        const cardItem = `
            <div class="cart__product" data-product-id="${id}">
                <div class="cart__img">
                    <img src="${img}" alt="${title}">
                </div>
                <div class="cart__info">
                    <div class="cart__title">${title}</div>
                    <div class="cart__block-btns">
                        <div class="cart__minus">-</div>
                        <div class="cart__count">1</div>
                        <div class="cart__plus">+</div>
                    </div>
                </div>
                <div class="cart__prices">
                    <div class="cart__price"><span>${price}</span> руб</div>
                    <div class="cart__price-discount"><span>${priceDiscount}</span> руб</div>
                </div>
                <div class="cart__del-cart">
                    <i class="bi bi-trash3"></i>
                </div>
            </div>
        `;
        cartContainer.insertAdjacentHTML('beforeend', cardItem);
    });
}