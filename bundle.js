!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=2)}([function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";s.r(e);class i{constructor(t,e,s){this.model=t,this.viewModel=e,this.view=s}setActions(){const{wrapper:t,list:e,pagination:s}=this.view,{current:n,start:a,previos:o,next:r}=s,l=o.find(".tooltip-previos"),p=r.find(".tooltip-next");let c=this.view.getRoot().clientWidth,d=0,h=1;n.html(h),p.html(h+1),t.on("pointerdown",s=>{e.addClass("active");const a=e.get(0).scrollWidth,r=s.clientX,u=r-d;t.on("pointermove",t=>{e.css({left:`${t.clientX-u}px`})}),t.on("pointerup",s=>{i.doDefault(s),e.removeClass("active"),t.off("pointermove").off("pointerup"),s.clientX-r!=0&&(s.clientX-r>0?(d=d+c>0?0:d+c,e.css({left:`${d}px`}),h=i.setPagePosition(l,p,n,o,h,!0)):(e.css({left:`${d-=c}px`}),h=i.setPagePosition(l,p,n,o,h,!1)),a<=3*c-d&&this.loadNextItems())})}).on("dragstart",t=>{i.doDefault(t)}),n.on("pointerdown",t=>{i.doDefault(t)}),a.on("pointerdown",t=>{i.doDefault(t),e.css({left:`${d=0}px`}),h=i.setPagePosition(l,p,n,o,1,!0),e.css({left:0}),n.html(h=1)}),o.on("pointerdown",t=>{i.doDefault(t),e.css({left:`${d+=c}px`}),h=i.setPagePosition(l,p,n,o,h,!0)}),r.on("pointerdown",t=>{i.doDefault(t),e.css({left:`${d-=c}px`});const s=e.get(0).scrollWidth;h=i.setPagePosition(l,p,n,o,h,!1),s<=3*c-d&&this.loadNextItems()}),window.addEventListener("resize",()=>{if(0!==d){const t=c;let s=(d/c*(t/(c=this.view.getRoot().clientWidth))).toFixed(0);t!==c&&(s=t>c?+s-1:+s+1),d=s*c,e.css({left:`${d}px`}),h=-(+s-1),n.html(h),l.html(h-1),p.html(h+1)}else c=this.view.getRoot().clientWidth})}loadNextItems(){this.model.getNextItems().then(t=>{window.console.log(t),this.view.render(this.viewModel.prepareData(t))}).catch(t=>{window.console.log(t)})}static setPagePosition(t,e,s,i,n,a){let o=n;return a?(o=1===o?o:o-1,s.html(o)):s.html(o+=1),t.html(o-1),e.html(o+1),o>2?i.removeClass("not-active"):i.addClass("not-active"),o}static doDefault(t){t.preventDefault(),t.stopPropagation()}search(){this.view.form.on("submit",t=>{i.doDefault(t),this.model.getItems(this.view.search.value()).then(t=>{this.view.render(this.viewModel.prepareData(t)),this.view.addPagination(),this.setActions()}).catch(t=>{window.console.log(t)})}),this.view.form.on("mousedown",t=>{t.stopPropagation()})}start(){this.view.render(),this.search()}}class n{constructor(t){this.url="https://www.googleapis.com/youtube/v3/",this.key=t,this.pagination={nextToken:"",prevToken:""},this.options={type:"video",part:"snippet",maxResults:"15",q:""}}getRequestString(t,e){let s=`${this.url+t}?key=${this.key}`;return Object.keys(e).forEach(t=>{s+=`&${t}=${e[t]}`}),s}getItems(t){const e={type:"video",part:"snippet",maxResults:"15",q:t};return new Promise((t,s)=>{fetch(this.getRequestString("search",e)).then(t=>t.json()).then(i=>{const{items:a}=i;this.pagination.nextToken=i.nextPageToken,this.getItemsStatistics(n.getItemsIds(a)).then(s=>{this.options=e,t({videos:a,statistics:s.items})}).catch(t=>s(t))}).catch(t=>s(t))})}getItemsStatistics(t){const e={id:t,part:"snippet, statistics"};return new Promise((t,s)=>{fetch(this.getRequestString("videos",e)).then(t=>t.json()).then(e=>t(e)).catch(t=>s(t))})}static getItemsIds(t){return t.map(t=>t.id.videoId)}search(t){return this.options.q=t,this.getItems()}getNextItems(){const t=`${this.getRequestString("search",this.options)}&pageToken=${this.pagination.nextToken}`;return new Promise((e,s)=>{fetch(t).then(t=>t.json()).then(t=>{const{items:i}=t;this.pagination.nextToken=t.nextPageToken,this.getItemsStatistics(n.getItemsIds(i)).then(t=>{e({videos:i,statistics:t.items})}).catch(t=>s(t))}).catch(t=>s(t))})}}class a{constructor(t){this.data=t}getData(){return this.data}prepareData(t){return this.data=t,t.videos.map((e,s)=>{const{id:i,snippet:n}=e,{publishedAt:a,channelId:o,channelTitle:r,title:l,description:p,thumbnails:c}=n,{viewCount:d,likeCount:h,dislikeCount:u}=t.statistics[s].statistics;return{videoId:i.videoId,videoTitle:l,owner:r,ownerId:o,videoDescription:p,uploaded:a.split("").slice(0,10).join(""),views:d,likes:h,dislikes:u,thumbnailUrl:c.default.url,thumbnailSize:{width:c.default.width,height:c.default.height}}})}}function o(t,e={},s=document){let i,n=[];const a={};return"object"==typeof t?n=[].slice.call(t):"<"===t[0]&&">"===t[t.length-1]?(i=s.createElement(t.split("").slice(1,t.length-1).join("")),e&&"object"==typeof e&&Object.keys(e).length>0&&Object.keys(e).forEach(t=>{i.setAttribute(t.toString(),`${e[t]}`)}),n.push(i)):(i=s.querySelectorAll(t),n=[].slice.call(i)),{elements:n,get(t){return t>=0?this.elements[t]:this.elements},html(t){return this.elements.forEach(e=>{e.innerHTML=t}),this},addClass(t){return this.elements.forEach(e=>{e.classList.add(t)}),this},removeClass(t){return this.elements.forEach(e=>{e.classList.remove(t)}),this},find:t=>o(t),append(t){return this.elements.forEach(e=>{t.elements.forEach(t=>{e.appendChild(t)})}),this},value(){return this.elements[0].value},css(t,e){if("string"==typeof t){if(!e)return window.getComputedStyle(this.elements[0]).getPropertyValue(t);this.elements.forEach(s=>{s.setAttribute("style",`${t}:${e}`)})}else{if("object"!=typeof t||e)throw new Error("invalid parameters");this.elements.forEach(e=>{Object.keys(t).forEach(s=>{e.setAttribute("style",`${s}:${t[s]}`)})})}return this},on(t,e){return this.elements.forEach(s=>{a[t]=e,s.addEventListener(t,e)}),this},off(t){return this.elements.forEach(e=>{const s=a[t];e.removeEventListener(t,s),delete a[t]}),this}}}s(0),s(1);class r{constructor(t){let e;"string"==typeof t?e=o(t):[e]=t,this.wrapper=o("<div>",{class:"wrapper"}),this.form=o("<form>",{class:"search-form",name:"search"}),this.search=o("<input>",{class:"search-text",type:"text",name:"search-input",placeholder:"Ask YouTube"}),this.list=o("<ul>",{class:"search-list-container"}),this.submit=o("<button>",{class:"fa fa-search submit-button",type:"submit",value:""}),this.pagination={start:o("<li>",{class:"pagination-item pagination-start"}).append(o("<i>",{class:"fa fa-angle-double-left"})).append(o("<a>",{class:"pagination-link link-start",href:"#1"}).append(o("<span>",{class:"pagination-tooltip tooltip-start"}).html("1"))),previos:o("<li>",{class:"pagination-item pagination-previos not-active"}).append(o("<i>",{class:"fa fa-angle-left"})).append(o("<a>",{class:"pagination-link link-previos",href:"#previos"}).append(o("<span>",{class:"pagination-tooltip tooltip-previos"}))),current:o("<li>",{class:"pagination-item pagination-current"}),next:o("<li>",{class:"pagination-item pagination-next"}).append(o("<i>",{class:"fa fa-angle-right"})).append(o("<a>",{class:"pagination-link link-next",href:"#next"}).append(o("<span>",{class:"pagination-tooltip tooltip-next"})))},this.container=e}createDefaultTemplate(){this.form.append(this.search),this.form.append(this.submit),this.wrapper.append(this.form),this.wrapper.append(this.list),this.container.append(this.wrapper)}addPagination(){const t=o("<ul>",{class:"pagination-container"}).append(this.pagination.start).append(this.pagination.previos).append(this.pagination.current).append(this.pagination.next);this.wrapper.append(t)}getRoot(){return this.container.get(0)}static createCards(t){const e=o("<li>",{class:"card-item-container"}),s=o("<img>",{class:"card-item-thumb",src:t.thumbnailUrl}),i=o("<a>",{class:"card-item-link",href:`https://www.youtube.com/watch?v=${t.videoId}`}).html(t.videoTitle),n=o("<p>",{class:"card-item-description"}).html(t.videoDescription),a=o("<p>",{class:"card-item-info"}).append(o("<div>",{class:"card-item-info-left"}).append(o("<i>",{class:"fa fa-user info-channel"})).append(o("<i>",{class:"fa fa-calendar info-upload-date"})).append(o("<i>",{class:"fa fa-eye info-views"}))).append(o("<div>",{class:"card-item-info-right"}).append(o("<a>",{class:"info-video-owner",href:`https://www.youtube.com/channel/${t.ownerId}`}).html(t.owner)).append(o("<span>",{class:"info-upload-date-text"}).html(t.uploaded)).append(o("<span>",{class:"info-views-count"}).html(t.views))),r=o("<p>",{class:"card-item-footer"}).append(o("<div>",{class:"card-item-footer-left"}).append(o("<i>",{class:"fa fa-thumbs-up footer-likes-icon"})).append(o("<span>",{class:"footer-likes"}).html(t.likes))).append(o("<div>",{class:"card-item-footer-right"}).append(o("<i>",{class:"fa fa-thumbs-down footer-dislikes-icon"})).append(o("<span>",{class:"footer-dislikes"}).html(t.dislikes)));return e.append(s).append(i).append(a).append(n).append(r),e}render(t){t&&t.length>0?t.forEach(t=>{this.list.append(r.createCards(t))}):this.createDefaultTemplate()}}window.addEventListener("load",()=>{const t=new r("body"),e=new n("AIzaSyDcwQl4DQrL6VySgxxNznXYq-q7-DF20wE"),s=new a(e);new i(e,s,t).start()})}]);
//# sourceMappingURL=bundle.js.map