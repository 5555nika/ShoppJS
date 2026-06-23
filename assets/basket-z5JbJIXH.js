import{a as e,i as t,n,o as r,r as i,t as a}from"./utils-CAzQhSK1.js";var o=document.querySelector(`.cart`),s=[];o?.addEventListener(`click`,u),c();async function c(){try{if(!s.length){let e=await fetch(`./products.json`);if(!e.ok)throw Error(e.statusText);l(await e.json())}}catch(n){t(e),console.log(n instanceof Error?n.message:`error`)}}function l(i){if(!o)return;if(o.innerHTML=``,!i||!i.length){t(e);return}a(i);let s=n();if(!s||!s.length){t(r);return}let c=i.filter(e=>s.some(t=>Number(t)===e.id));if(!c){t(r);return}d(c)}function u(e){let t=e.target.closest(`.cart__del-cart`);if(!t)return;let r=t.closest(`.cart__product`),a=Number(r?.dataset?.productId),o=n();o=o.filter(e=>e!==a),i(o),c()}function d(e){o&&e.forEach(e=>{let{id:t,img:n,title:r,price:i,discount:a}=e,s=`
            <div class="cart__product" data-product-id="${t}">
                <div class="cart__img">
                    <img src="${n}" alt="${r}">
                </div>
                <div class="cart__info">
                    <div class="cart__title">${r}</div>
                    <div class="cart__block-btns">
                        <div class="cart__minus">-</div>
                        <div class="cart__count">1</div>
                        <div class="cart__plus">+</div>
                    </div>
                </div>
                <div class="cart__prices">
                    <div class="cart__price"><span>${i}</span> руб</div>
                    <div class="cart__price-discount"><span>${Math.round(i-i*a/100)}</span> руб</div>
                </div>
                <div class="cart__del-cart">
                    <i class="bi bi-trash3"></i>
                </div>
            </div>
        `;o.insertAdjacentHTML(`beforeend`,s)})}