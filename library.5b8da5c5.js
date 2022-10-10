const e=document.querySelector(".mask");window.addEventListener("DOMContentLoaded",(function(){setTimeout((()=>{e.classList.add("hide")}),600)}));const t={formEl:document.querySelector(".form"),inputEl:document.querySelector(".input__form"),buttonEl:document.querySelector(".submit"),error:document.querySelector(".error__message"),enLang:document.querySelector(".en"),ukLang:document.querySelector(".uk")};console.log(t.enLang),t.enLang.addEventListener("click",(()=>{t.enLang.classList.add("activeLang"),t.ukLang.classList.remove("activeLang")})),t.ukLang.addEventListener("click",(()=>{t.ukLang.classList.add("activeLang"),t.enLang.classList.remove("activeLang")}));try{t.formEl.addEventListener("submit",(function(e){e.preventDefault();const a=e.currentTarget.elements[0].value;t.error.style.display="none",""==a&&(t.error.style.display="block");e.currentTarget.reset()}))}catch(e){console.log(e)}const a={watched:document.querySelector(".watched"),queue:document.querySelector(".queue"),enLang:document.querySelector(".en"),ukLang:document.querySelector(".uk")};a.enLang.addEventListener("click",(()=>{a.enLang.classList.add("activeLang"),a.ukLang.classList.remove("activeLang")})),a.ukLang.addEventListener("click",(()=>{a.ukLang.classList.add("activeLang"),a.enLang.classList.remove("activeLang")}));try{a.watched.addEventListener("click",(()=>{a.watched.classList.add("active"),a.queue.classList.remove("active")}))}catch(e){console.log(e)}try{a.queue.addEventListener("click",(()=>{a.queue.classList.add("active"),a.watched.classList.remove("active")}))}catch(e){console.log(e)}async function n(e,t){try{const a="https://api.themoviedb.org/3/search/movie";return(await fetch(`${a}?api_key=1c5c067e324c39f9223ad13ef9891a0a&page=${t}&query=${e}`)).json()}catch(e){console.error(e)}}async function o(e){try{console.log(e);const t="https://api.themoviedb.org/3/movie/";return(await fetch(`${t}${e}?api_key=1c5c067e324c39f9223ad13ef9891a0a`)).json()}catch(e){console.error(e)}}const r=document.querySelector(".gallery"),c=localStorage.getItem("currentArrayFilm");JSON.parse(c);var s=function(e){const t=e.map((e=>{const{title:t,genresName:a,release_date:n,id:o,poster_path:r}=e;return`<li class="gallery__item">\n            <a class="gallery__card" href="#" id="${o}">\n               <picture>\n                  <source media="(min-width: 1280px)" srcset="\n                              https://image.tmdb.org/t/p/w500${r}    1x,\n                              https://image.tmdb.org/t/p/original${r} 2x,\n                              https://image.tmdb.org/t/p/original${r} 3x\n                           " type="image/jpg" />\n                  <source media="(min-width: 768px)" srcset="\n                              https://image.tmdb.org/t/p/w342${r}    1x,\n                              https://image.tmdb.org/t/p/w780${r} 2x,\n                              https://image.tmdb.org/t/p/original${r} 3x\n                           " type="image/jpg" />\n                  <source media="(max-width: 767px)" srcset="\n                              https://image.tmdb.org/t/p/w342${r}    1x,\n                              https://image.tmdb.org/t/p/w780${r} 2x,\n                              https://image.tmdb.org/t/p/original${r} 3x\n                           " type="image/jpg" />\n                  <img class="gallery__foto" src="https://image.tmdb.org/t/p/w500${r}" width="450"\n                     height="294" alt="${t} poster" loading="lazy" />\n               </picture>\n               <h2 class="gallery__subtitle">${t}</h2>\n               <div class="gallery__info">\n                  <p class="gallery__genres">${a}</p>\n                  <p class="gallery__year">${n.slice(0,4)}</p>\n               </div>\n            </a>\n         </li>`})).join("");r.insertAdjacentHTML("beforeend",t)};const l=document.querySelector(".gallery"),i=document.querySelector(".form"),d=document.querySelector(".error__message");i.addEventListener("input",(function(e){u=e.target.value})),i.addEventListener("submit",(function(e){e.preventDefault(),l.innerHTML="",n(u,1).then((e=>{p(e)}))}));let u="",m=[];(async function(){try{const e="https://api.themoviedb.org/3/genre/movie/list";return(await fetch(`${e}?api_key=1c5c067e324c39f9223ad13ef9891a0a`)).json()}catch(e){console.error(e)}})().then((e=>{localStorage.setItem("Genres",JSON.stringify(e.genres))}));localStorage.getItem("Genres");const g=localStorage.getItem("currentArrayFilm");JSON.parse(g);function p(e){const t=e.results;e.total_results,e.total_pages;let a=function(e){m=[];e.map((e=>{m.push(e)}));if(0==m.length)return d.style.display="block",JSON.parse(localStorage.getItem("currentArrayFilm"));let t=function(e){return e.map((e=>{return(t=e).genresName=function(e){let t="";const a=localStorage.getItem("Genres"),n=JSON.parse(a);return 0!==e.length&&(e.length>3&&(e=e.slice(0,3)),Object.values(n).forEach((a=>{e.includes(a.id)&&(t=t.concat(a.name,", "))}))),t=t.slice(0,t.length-2),t}(t.genre_ids),t;var t}))}(m);return localStorage.setItem("currentArrayFilm",JSON.stringify(t)),t}(t);s(a)}(async function(e){try{const t="https://api.themoviedb.org/3/trending/movie/week";return(await fetch(`${t}?api_key=1c5c067e324c39f9223ad13ef9891a0a&page=${e}`)).json()}catch(e){console.error(e)}})(1).then((e=>{p(e)})).catch((e=>{console.log(e)}));document.querySelector(".gallery-lib"),document.querySelector(".div__text--decoration");const _=document.querySelector(".gallery"),y=document.querySelector(".modal"),v=document.querySelector(".button-modal__close");async function b(e){let t=e.target.dataset.id;console.log(e.target.dataset.id);let a=await async function(e){return await o(e).then((e=>{localStorage.setItem("IMDb_id",JSON.stringify(e.imdb_id))})),await JSON.parse(localStorage.getItem("IMDb_id"))}(t),n=`https://www.imdb.com/title/${a}`;console.log(window.open(n))}_.addEventListener("click",(function(e){if(e.target===e.currentTarget)return;e.preventDefault(),function(e,t){const{id:a,title:n,original_title:o,poster_path:r,popularity:c,vote_average:s,vote_count:l,overview:i,genresName:d}=e;let u=`    \n        <div class="button-modal--flex">\n            <img class="button-modal__img" src="https://image.tmdb.org/t/p/original${r}" alt="${n} poster">\n            <div class="modal__about--movie">\n                <h2 class="modal__about--title">${n}</h2>\n                <p class="modal__about--title--movie">Vote / Votes <span class="modal__about--rating">${s}</span><span\n\n                        class="modal__about--title--movie-slech">/</span> <span\n                        class="modal__about--text--bleck">${l}</span>\n                        </p>\n                        <button class="imdb-btn" data-id="${a}" type="button">IMDb</button>\n                <p class="modal__about--title--movie">Popularity<span\n                        class="modal__about--text--popularity">${c}</span>\n                <p class="modal__about--title--movie">Original Title<span class="modal__about--text--original--title">A\n                        ${o}</span>\n                <p class="modal__about--title--movie">Genre<span class="modal__about--text--genre">${d}</span>\n                </p>\n                </p>\n                <p class="about__movie--text">About</p>\n                <p class="about__movie--text--content">${i}</p>\n                <ul class="list__btn--add">\n                    <li><button class="add__watched" data-id="${a}" type="button">add to Watched</button></li>\n                    <li><button class="add_queue" data-id="${a}" type="button">add to queue</button></li>\n                </ul>\n\n            </div>\n        </div>\n    </div>`;y.insertAdjacentHTML("beforeend",u)}((t=e.target.closest(".gallery__card").id,function(){let e=localStorage.getItem("currentArrayFilm");return JSON.parse(e)}().find((e=>e.id===Number(t))))),document.querySelector(".backdrop").classList.remove("display__none");var t;document.querySelector(".add__watched"),document.querySelector(".add_queue");document.querySelector(".imdb-btn").addEventListener("click",b)})),v.addEventListener("click",(function(e){document.querySelector(".add__watched"),document.querySelector(".add_queue");document.querySelector(".imdb-btn").removeEventListener("click",b),document.querySelector(".backdrop").classList.add("display__none"),document.querySelector(".button-modal--flex").remove(),localStorage.removeItem("IMDb_id")}));
//# sourceMappingURL=library.5b8da5c5.js.map
