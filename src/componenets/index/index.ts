import { COUNT_SHOW_CARDS_CLICK, ERROR_SERVER } from "./../../constans"
import { checkingRelavanceValueBasket, getLocalStorgeCart, setLocalStorageCart, showErrorMessage } from "../../utils"

export interface IProduct {
    id: number,
    img: string,
    title: string,
    price: number,
    discount: number
}

const cards = document.querySelector<HTMLElement>('.cards')
const btn = document.querySelector<HTMLButtonElement>('.show-cards')
let shownCards: number = COUNT_SHOW_CARDS_CLICK
let count: number = 0
const productsCard: IProduct[] = []

btn?.addEventListener('click', showMoreSlice)
cards?.addEventListener('click', handleClick)

getProductsCard()

async function getProductsCard () {
    try {
        if (!productsCard.length) {
            const response = await fetch('/products.json')
            if (!response.ok) {
            throw new Error(response.statusText)
            }
            const data  = await response.json()
            productsCard.push(...data)

            if (productsCard.length > shownCards) {
                btn?.classList.remove('none')
            }
            render(data)
        } 
    } catch (e) {
        showErrorMessage(ERROR_SERVER)
        console.log(e instanceof Error ? e.message : 'error')
    } 

}

    function render (data: IProduct[]) {
        if (!data || data.length === 0) {
            showErrorMessage(ERROR_SERVER)
        }

        if (!cards) return
        cards.innerHTML = ''

        const firstCards = data.slice(0, shownCards)
        createCards(firstCards)

        checkingRelavanceValueBasket(data)

        const basket = getLocalStorgeCart<number>()
        activeBtn(basket)
}

    function showMoreSlice () {
        if(shownCards >= productsCard.length)  return

        count++
        const next = count * COUNT_SHOW_CARDS_CLICK

        const otherCards = productsCard.slice(shownCards, next)
        createCards(otherCards)

        const basket = getLocalStorgeCart<number>()
        activeBtn(basket)

        shownCards = cards?.children.length || 0

        if(shownCards >= productsCard.length) {
            btn?.classList.add('none')
        }
    }

    function handleClick (e: MouseEvent) {
        const target = e.target as HTMLElement
        const btnAdd = target.closest<HTMLElement>('.card__add')
        if (!btnAdd) return

        const card = btnAdd.closest<HTMLElement>('.card')
        const id = card?.dataset?.productId
        if (!id) return

        const productId = Number(id)

        const basket = getLocalStorgeCart<number>()

        if (basket.includes(productId)) return
        basket.push(productId)
        
        setLocalStorageCart(basket)
        activeBtn(basket)

}

    function activeBtn (basket: number[]) {
        const btns = document.querySelectorAll<HTMLButtonElement>('.card__add')
        btns.forEach(btn => {
            const card = btn.closest<HTMLElement>('.card')
            const id = card?.dataset?.productId
            const isInBasket = id ? basket.includes(Number(id)) : false

            btn.disabled = isInBasket
            btn.classList.toggle('active', isInBasket)
            btn.textContent = isInBasket ? 'корзине' : 'В корзину'
        })
}

function createCards(data: IProduct[]) {                        
    data.forEach(card => {
        const { id, img, title, price, discount } = card;
        const priceDiscount = Math.round(price - ((price * discount) / 100));
        const cardItem = `
            <div class="card" data-product-id="${id}">
            <div class="card__top">
                <a href="./card.html?id=${id}" class="card__image">
                    <img src="${img}" alt="${title}">
                </a>
                <div class="card__label"> -${discount}%</div>
            </div>
                <div class="card__bottom">
                    <div class="card__prices">
                        <div class="card__price card__price--discount">${priceDiscount} руб</div>
                        <div class="card__price card__price--common">${price} руб</div>
                    </div>
                <a href="./card.html?id=${id}" class="card__title">${title}</a>
                <button class="card__add">В корзину</button>
            </div>
        </div>
        `
        cards?.insertAdjacentHTML('beforeend', cardItem)
    })
}