import{a as e,i as t,s as n,t as r}from"./utils-CAzQhSK1.js";var i=document.querySelector(`.wrapper`),a=[];o();async function o(){try{if(!a.length){let e=await fetch(`./products.json`);if(!e.ok)throw Error(e.statusText);c(await e.json())}}catch(n){t(e),console.log(n instanceof Error?n.message:`error`)}}function s(e){return new URLSearchParams(window.location.search).get(e)}function c(i){if(!i||i.length===0){t(e);return}r(i);let a=Number(s(`id`));a||t(n);let o=i.find(e=>e.id===a);if(!o){t(n);return}l(o)}function l(e){let{img:t,title:n,price:r,discount:a,descr:o}=e,s=`
        <div class="product">
            <h2 class="product__title">${n}</h2>
                <div class="product__img">
                    <img src="${t}" alt="${n}">
                </div>
                <p class="product__descr">${o}</p>
                    <div class="product__inner-price">
                        <div class="product__price">
                            <b>Цена:</b> ${r} руб
                        </div>
                        <div class="product__price--discount">
                            <b>Цена со скидкой:</b> ${Math.round(r-r*a/100)} руб
                        </div>
                    </div>
        </div>
    `;i&&i.insertAdjacentHTML(`beforeend`,s)}