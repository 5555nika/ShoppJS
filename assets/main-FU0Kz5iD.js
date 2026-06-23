import{a as e,i as t,n,r,t as i}from"./utils-De9S9yiS.js";var a=document.querySelector(`.cards`),o=document.querySelector(`.show-cards`),s=5,c=0,l=[];o?.addEventListener(`click`,f),a?.addEventListener(`click`,p),u();async function u(){try{if(!l.length){let e=await fetch(`/products.json`);if(!e.ok)throw Error(e.statusText);let t=await e.json();l.push(...t),l.length>s&&o?.classList.remove(`none`),d(t)}}catch(n){t(e),console.log(n instanceof Error?n.message:`error`)}}function d(r){(!r||r.length===0)&&t(e),a&&(a.innerHTML=``,h(r.slice(0,s)),i(r),m(n()))}function f(){if(s>=l.length)return;c++;let e=c*5;h(l.slice(s,e)),m(n()),s=a?.children.length||0,s>=l.length&&o?.classList.add(`none`)}function p(e){let t=e.target.closest(`.card__add`);if(!t)return;let i=t.closest(`.card`)?.dataset?.productId;if(!i)return;let a=Number(i),o=n();o.includes(a)||(o.push(a),r(o),m(o))}function m(e){document.querySelectorAll(`.card__add`).forEach(t=>{let n=t.closest(`.card`)?.dataset?.productId,r=n?e.includes(Number(n)):!1;t.disabled=r,t.classList.toggle(`active`,r),t.textContent=r?`корзине`:`В корзину`})}function h(e){e.forEach(e=>{let{id:t,img:n,title:r,price:i,discount:o}=e,s=`
            <div class="card" data-product-id="${t}">
            <div class="card__top">
                <a href="./card.html?id=${t}" class="card__image">
                    <img src="${n}" alt="${r}">
                </a>
                <div class="card__label"> -${o}%</div>
            </div>
                <div class="card__bottom">
                    <div class="card__prices">
                        <div class="card__price card__price--discount">${Math.round(i-i*o/100)} руб</div>
                        <div class="card__price card__price--common">${i} руб</div>
                    </div>
                <a href="./card.html?id=${t}" class="card__title">${r}</a>
                <button class="card__add">В корзину</button>
            </div>
        </div>
        `;a?.insertAdjacentHTML(`beforeend`,s)})}