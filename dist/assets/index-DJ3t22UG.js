(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`Произошла ошибка на сервере, попробуйте позже`;function t(e){let t=document.querySelector(`.cart`)||document.querySelector(`.cards`)||document.querySelector(`.wrapper`);t&&(t.innerHTML=`
            <div class="error">
                <h2>⚠️ ${e}</h2>
                <p><a href="./">Перейти к списку товаров</a></p>
            </div>
    `)}function n(){let e=localStorage.getItem(`basket`);return e?JSON.parse(e):[]}function r(){let e=document.querySelector(`.basket__count`);e&&(e.textContent=n().length.toString())}function i(e){localStorage.setItem(`basket`,JSON.stringify(e)),r()}function a(e){let t=n(),a=t.filter(t=>e.some(e=>e.id===t));a.length===t.length?r():i(a)}var o=document.querySelector(`.cards`),s=document.querySelector(`.show-cards`),c=5,l=0,u=[];s?.addEventListener(`click`,p),o?.addEventListener(`click`,m),d();async function d(){try{if(!u.length){let e=await fetch(`/products.json`);if(!e.ok)throw Error(e.statusText);let t=await e.json();u.push(...t),u.length>c&&s?.classList.remove(`none`),f(t)}}catch(n){t(e),console.log(n instanceof Error?n.message:`error`)}}function f(r){(!r||r.length===0)&&t(e),o&&(o.innerHTML=``,g(r.slice(0,c)),a(r),h(n()))}function p(){if(c>=u.length)return;l++;let e=l*5;g(u.slice(c,e)),h(n()),c=o?.children.length||0,c>=u.length&&s?.classList.add(`none`)}function m(e){let t=e.target.closest(`.card__add`);if(!t)return;let r=t.closest(`.card`)?.dataset?.productId;if(!r)return;let a=Number(r),o=n();o.includes(a)||(o.push(a),i(o),h(o))}function h(e){document.querySelectorAll(`.card__add`).forEach(t=>{let n=t.closest(`.card`)?.dataset?.productId,r=n?e.includes(Number(n)):!1;t.disabled=r,t.classList.toggle(`active`,r),t.textContent=r?`корзине`:`В корзину`})}function g(e){e.forEach(e=>{let{id:t,img:n,title:r,price:i,discount:a}=e,s=`
            <div class="card" data-product-id="${t}">
            <div class="card__top">
                <a href="./card.html?id=${t}" class="card__image">
                    <img src="${n}" alt="${r}">
                </a>
                <div class="card__label"> -${a}%</div>
            </div>
                <div class="card__bottom">
                    <div class="card__prices">
                        <div class="card__price card__price--discount">${Math.round(i-i*a/100)} руб</div>
                        <div class="card__price card__price--common">${i} руб</div>
                    </div>
                <a href="./card.html?id=${t}" class="card__title">${r}</a>
                <button class="card__add">В корзину</button>
            </div>
        </div>
        `;o?.insertAdjacentHTML(`beforeend`,s)})}