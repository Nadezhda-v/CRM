!function(){"use strict";const e="https://zealous-veiled-terrier.glitch.me/",t=async(t,n)=>{let{method:o="GET",callback:c,body:a,headers:l}=n;try{const n={method:o};a&&(n.body=JSON.stringify(a)),l&&(n.headers=l);const r=await fetch(`${e}${t}`,n),s=await r.json();if(r.ok)return c&&c(null,s),s;throw new Error(s.message)}catch(e){c&&c(e)}},n=(e,t,n)=>{const o=document.createElement("tr"),c=document.createElement("td");c.className="table__cell",c.textContent=t;const a=document.createElement("td");a.className="table__cell table__cell_left table__cell_name",a.dataset.id=e.id,a.textContent=e.title;const l=document.createElement("span");l.className="table__cell-id",l.textContent=`id: ${a.dataset.id}`;const r=document.createElement("td");r.className="table__cell table__cell_left table__cell_category",r.textContent=e.category;const s=document.createElement("td");s.className="table__cell table__cell_units",s.textContent=e.units;const i=document.createElement("td");i.className="table__cell table__cell_count",i.textContent=e.count;const d=document.createElement("td");d.className="table__cell table__cell_price",d.textContent="$"+e.price;const u=document.createElement("td");u.className="table__cell table__cell_total-price",u.textContent="$"+n;const _=document.createElement("td");_.className="table__cell table__cell_btn-wrapper";const m=document.createElement("button");m.className="table__btn table__btn_pic",m.dataset.pic=e.image;const p=document.createElement("button");p.className="table__btn table__btn_edit";const b=document.createElement("button");b.className="table__btn table__btn_del",o.append(c,a,_),a.prepend(l);const g=[r,s,i,d,u];return a.after(...g),_.append(m,p,b),o},o=()=>{const e=document.createElement("div");e.classList.add("image-container");const t=document.createElement("img");return t.classList.add("modal__label_file-add"),t.alt="Изображение товара",e.append(t),{imageContainer:e,img:t}},c=(e,t)=>{const n=document.createElement("div");n.classList.add("overlay__modal-action"),n.classList.add("warn"===t?"overlay__modal-action_error":"overlay__modal-action_confirm");const o=document.createElement("div");o.classList.add("modal","modal__action");const c=document.createElement("button");c.type="button",c.classList.add("modal__close","modal__close-error");const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("xmlns","http://www.w3.org/2000/svg"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("width","24"),a.setAttribute("height","24"),a.setAttribute("fill","none");const l=document.createElementNS("http://www.w3.org/2000/svg","path");l.setAttribute("d","M2 2L22 22"),l.setAttribute("stroke","#6E6893"),l.setAttribute("stroke-width","3"),l.setAttribute("stroke-linecap","round");const r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d","M2 22L22 2"),r.setAttribute("stroke","#6E6893"),r.setAttribute("stroke-width","3"),r.setAttribute("stroke-linecap","round"),a.append(l,r),c.append(a);const s=document.createElement("div");if(s.classList.add("modal__content"),"warn"===t){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("xmlns","http://www.w3.org/2000/svg"),e.setAttribute("width","94"),e.setAttribute("height","94"),e.setAttribute("viewBox","0 0 94 94"),e.setAttribute("fill","none");const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","M2 2L92 92"),t.setAttribute("stroke","#D80101"),t.setAttribute("stroke-width","3"),t.setAttribute("stroke-linecap","round");const n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("d","M2 92L92 2"),n.setAttribute("stroke","#D80101"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round"),e.append(t,n),s.append(e)}const i=document.createElement("h2");if(i.classList.add("modal__title"),i.classList.add("warn"===t?"modal__title_error":"modal__title_action"),i.textContent=e,s.append(i),"confirm"===t){const e=document.createElement("div");e.classList.add("button__wrap");const t=document.createElement("button");t.type="button",t.classList.add("button","button__confirm","button__confirm_cancel"),t.textContent="Отмена";const o=document.createElement("button");o.type="button",o.classList.add("button","button__confirm","button__confirm_del"),o.textContent="Удалить",e.append(t,o),s.append(e),t.addEventListener("click",(()=>{n.classList.remove("active"),document.querySelectorAll(".overlay__modal-action").forEach((e=>e.remove()))}))}return o.append(c,s),n.append(o),document.body.append(n),c.addEventListener("click",(()=>{n.classList.remove("active"),n.remove()})),n},a=document.querySelector(".overlay"),l=document.querySelector(".overlay__modal"),r=document.querySelector(".modal__form"),s=r.querySelector(".modal__total-price"),i=document.querySelector("#discount"),d=document.querySelector(".modal__input_discount"),u=document.querySelector("#price"),_=document.querySelector("#count"),m=document.querySelector(".cms__total-price"),p=document.querySelector(".panel__add-goods"),b=document.querySelector(".table__body"),g=b.querySelectorAll("tr"),y=r.querySelector(".modal__file"),v=r.querySelector(".modal__label_file"),E=r.querySelector(".modal__label_category"),h=l.querySelector(".vendor-code__id"),w=document.querySelector(".modal__title"),S=r.querySelector(".modal__submit"),f=document.querySelector(".sub-panel__pages"),q=document.querySelector("#choicePage"),L=document.querySelector(".panel__filter"),k=(document.querySelector(".panel__list"),document.querySelector(".panel__input")),x=e=>{l.querySelector(".vendor-code__id").textContent=e,e?(w.textContent="Изменить товар",S.textContent="Изменить товар"):(w.textContent="Добавить товар",S.textContent="Добавить товар")},C=e=>{e.classList.add("active")},A=e=>{e.classList.remove("active")},$=e=>{d.value="",d.disabled=e},N=e=>e.toLocaleString("ru-RU",{minimumFractionDigits:2,maximumFractionDigits:2}),T=e=>{let t;t=e.message?e:"Что-то пошло не так";const n=c(`${t}`,"warn");C(n)},D=()=>{const e=r.querySelector(".image-container"),t=r.querySelector(".modal__label_file-error");e&&e.remove(),t&&t.remove()},P=()=>{const e=document.querySelector(".overlay__modal-action_error");e&&e.remove()},M=()=>{const e=b.querySelectorAll("tr").length,t=q.value;f.textContent=`1-${t} из ${e}`};q.addEventListener("change",M);const F=()=>{b.querySelectorAll("tr").forEach((e=>e.remove()))},R=()=>{let e=0;b.querySelectorAll("tr").forEach((t=>{const n=+t.querySelector(".table__cell_total-price").textContent.slice(1);e+=n}));const t=N(e);m.textContent="$ "+t},U=e=>{let t=+m.textContent.slice(1).replace(/\s/g,"").replace(",",".");t+=e;const n=N(t);m.textContent="$ "+n},j=()=>(e=>{const t=_.value*u.value;let n=e?t*(1-e/100):t;return n=Math.ceil(n),s.value="$ "+n.toFixed(2),n})(+d.value),z=(e,t)=>{if(e)return void console.warn(e);const n=document.createElement("datalist");n.id="category-list";const o=document.createElement("ul");o.classList.add("panel__list");const c=document.createElement("li");c.classList.add("panel__category"),c.textContent="Показать все",o.append(c),t.forEach((e=>{const t=document.createElement("option");t.value=e,n.append(t);const c=document.createElement("li");c.textContent=e,c.classList.add("panel__category"),o.append(c)})),E.after(n),L.after(o)},G=(e,o)=>{if(e)return void console.warn(e);let c=g.length+1;o.forEach((e=>{const t=(e=>{const t=e.count*e.price;let n=e.discount>0?t*(1-e.discount/100):t;return n=Math.ceil(n),s.value="$ "+n,n})(e),o=n(e,c,t);c++,b.append(o)})),R(),(async()=>{await t("api/category",{callback:z})})()};(async()=>{await t("api/goods",{callback:G}),M()})(),(()=>{const u=/\/\d/;let _;b.addEventListener("click",(t=>{const n=t.target.closest(".table__btn_pic");if(n){const t=n.getAttribute("data-pic");u.test(t)&&(e=>{const t=((e,t,n)=>{const o=screen.width,c=screen.height;return open("about:blank","",`width=800, height=600, left=${(o-800)/2}, top=${(c-600)/2}`)})(),n=document.createElement("img");n.src=e,n.alt="Изображение товара",t.document.body.append(n)})(`${e}${t}`)}})),b.addEventListener("click",(e=>{const n=e.target;if(n.closest(".table__btn_del")){const e=n.closest("tr"),o=e.querySelector(".table__cell_name").dataset.id,a=c("Вы действительно хотите удалить товар?","confirm");C(a),a.querySelector(".button__confirm_del").addEventListener("click",(()=>{P(),t(`api/goods/${o}`,{method:"DELETE",callback(t){if(t)T(t);else{const t=+e.querySelector(".table__cell_total-price").textContent.slice(1);U(-t),e.remove(),b.querySelectorAll("tr").forEach(((e,t)=>{e.querySelector(".table__cell").textContent=t+1})),A(a)}}})}))}})),p.addEventListener("click",(()=>{D(),r.reset(),s.value="$ 0",x(""),C(a)})),a.addEventListener("click",(e=>{const t=e.target;l.contains(t)&&!t.closest(".modal__close")||A(a)})),i.addEventListener("change",(()=>{$(!i.checked),j()})),r.addEventListener("input",(e=>{e.target.matches('.modal__input[type="number"]')&&(_=j())}));const m=1048576;y.addEventListener("change",(()=>{if(D(),y.files.length>0){const e=y.files[0];if(e.size>=m){const e=((e,t)=>{const n=document.createElement("span");return n.className="modal__label_file-error",n.textContent="Изображение не должно превышать размер 1 МБ",n})();v.before(e)}else{const t=document.querySelector(".modal__label_file-error");t&&t.remove();const n=URL.createObjectURL(e),{imageContainer:c,img:a}=o();a.src=n,y.after(c),c.style.display="block",c.addEventListener("click",(e=>{e.stopPropagation(),c.remove()}))}}})),r.addEventListener("submit",(async e=>{e.preventDefault(),P();const o=new FormData(r);let c=o.get("image");var l;c=c.size>0&&c.size<m?await(l=c,new Promise(((e,t)=>{const n=new FileReader;n.addEventListener("loadend",(()=>{e(n.result)})),n.addEventListener("error",(e=>{t(e)})),n.readAsDataURL(l)}))):[],console.log(h.textContent);const i=h.textContent;i?t(`api/goods/${i}`,{method:"PATCH",body:{title:o.get("title"),category:o.get("category"),description:o.get("description"),units:o.get("units"),discount:+o.get("discount"),count:+o.get("count"),price:+o.get("price"),image:c},callback(e,t){e?T(e):(((e,t)=>{const n=[...b.querySelectorAll("tr")].find((t=>t.querySelector(".table__cell_name").dataset.id===e.id));n&&(n.querySelector(".table__cell_name").childNodes[1].textContent=e.title,n.querySelector(".table__cell_category").textContent=e.category,n.querySelector(".table__cell_units").textContent=e.units,n.querySelector(".table__cell_count").textContent=e.count,n.querySelector(".table__cell_price").textContent="$"+e.price,n.querySelector(".table__cell_total-price").textContent="$"+t,n.querySelector(".table__btn_pic").dataset.pic=e.image)})(t,s.textContent.split(".")[0].replace(/\$\s/g,"")),R(),A(a),r.reset(),D(),$(!0))},headers:{"Content-Type":"application/json"}}):t("api/goods",{method:"POST",body:{title:o.get("title"),category:o.get("category"),description:o.get("description"),units:o.get("units"),discount:+o.get("discount"),count:+o.get("count"),price:+o.get("price"),image:c},callback(e,t){e?T(e):(((e,t)=>{const o=b.querySelectorAll("tr"),c=n(e,o.length+1,t);b.append(c),U(t)})(t,_),A(a),r.reset(),D(),$(!0))},headers:{"Content-Type":"application/json"}})})),b.addEventListener("click",(async n=>{const c=n.target;if(c.closest(".table__btn_edit")){P();const n=c.closest("tr").querySelector(".table__cell_name").dataset.id;await t(`api/goods/${n}`,{method:"GET",callback(t,n){if(t)T(t);else{(t=>{if(D(),u.test(t.image)){const{imageContainer:n,img:c}=o();c.src=`${e}${t.image}`,y.after(n),n.style.display="block"}const n=r.elements,c=Array.from(n).filter((e=>"INPUT"===e.tagName||"description"===e.name));for(const e of c)if(e.name in t){if("image"===e.name)continue;e.value=t[e.name],t.discount>0?(i.checked=!0,d.disabled=!1):($(!0),i.checked=!1)}})(n),x(n.id),_=j(),C(a);const t=r.querySelector(".image-container");t&&t.addEventListener("click",(e=>{e.stopPropagation(),t.remove()}))}}})}}));const g=async e=>{let{target:n}=e;if(n.classList.contains("panel__category")){const e=n.textContent;F(),"Показать все"!==e?await t(`api/goods/category/${e}`,{method:"GET",callback:G}):await t("api/goods",{callback:G}),R();const o=document.querySelector(".panel__list");A(o)}};L.addEventListener("click",(()=>{const e=document.querySelector(".panel__list");e.classList.toggle("active"),e.addEventListener("click",g)})),document.addEventListener("click",(e=>{let{target:t}=e;const n=document.querySelector(".panel__list");L.contains(t)||n.contains(t)||A(n)})),k.addEventListener("input",(()=>{const e=k.value;console.log(e),setTimeout((async()=>{k.value===e&&(F(),await t(`api/goods?search=${e}`,{method:"GET",callback:G}),R())}),300)}))})()}();