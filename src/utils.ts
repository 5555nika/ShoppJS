export function showErrorMessage(message: string) {
    const errorContainer = document.querySelector('.cart') || document.querySelector('.cards') || document.querySelector('.wrapper');
    if (!errorContainer) return;
    
    const msg = `
            <div class="error">
                <h2>⚠️ ${message}</h2>
                <p><a href="./">Перейти к списку товаров</a></p>
            </div>
    `;
    errorContainer.innerHTML = msg;
}

export function getLocalStorgeCart<T> (): T[] {
    const cartDataJson = localStorage.getItem('basket')
    return cartDataJson? JSON.parse(cartDataJson) : []
}

export function updateBasketCount () {
    const basketCount = document.querySelector('.basket__count')
    if (basketCount) {
    const basket = getLocalStorgeCart<number>()
    basketCount.textContent = basket.length.toString()
    }
}

export function setLocalStorageCart<T> (basket: T[]) {
    localStorage.setItem('basket', JSON.stringify(basket))
    updateBasketCount()
}

/* Проверка наличия товара в корзине */
export function checkingRelavanceValueBasket<T extends {id: number}> (productsData: T[]) {
    const basket = getLocalStorgeCart<number>()

    const existInProduct = basket.filter((basketId: number) => {
        return productsData.some(item => item.id === basketId )
    })
    
    if (existInProduct.length !== basket.length) {
        setLocalStorageCart(existInProduct)
    } else {
        updateBasketCount()
    }
}


