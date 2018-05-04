!function(){"use strict";const e=function(e,t,...n){const a=document.createElement(e);return t&&Object.keys(t).map(e=>{const n=t[e];if(n)switch(e){case"htmlFor":a.setAttribute("for",n);break;case"style":Object.assign(a.style,n);break;default:/^on/.test(e)?a.addEventListener(e.substring(2).toLowerCase(),n):a[e]=n}}),n.map(e=>{e instanceof HTMLElement?a.appendChild(e):a.innerHTML=e}),a},t="image-crop-picker",n=`\n    .${t} {\n        margin: 0 auto;\n        width: 300px;\n    }\n    .${t} > label {\n        display: block;\n        padding: 2em;\n        margin: .5em 0;\n        border: 2px dashed;\n        border-radius: 7px;\n        cursor: pointer;\n        opacity: .8;\n    }\n    .${t} > label:hover {\n        opacity: 1;\n    }\n    .${t} > canvas {\n        display: block;\n        margin: 0 auto;\n    }\n`;customElements.define(t,class extends HTMLElement{constructor(){super(),this.getAllAttributes=(()=>[].slice.call(this.attributes).reduce((e,t)=>{let{name:n,value:a}=t;if(a){switch(t.name){case"zoomRatio":case"maxSize":case"width":case"height":a=Number(a)}e[n]=a}return e},{}));const a=this,{className:s="",title:i="",innerText:c}=a,{accept:o="image/*",zoomRatio:l=.05,maxSize:r=102400,name:d=t,width:u=300,height:h=200}=a.getAllAttributes(),m=e("canvas",{tabIndex:"-1",width:u,height:h}),p=m.getContext("2d"),b=e=>{e.stopPropagation(),e.preventDefault()};let g,v=1,f={x:0,y:0};const y=()=>{const{x:e,y:t}=f,{width:n,height:s}=g;p.clearRect(0,0,n,s),p.drawImage(g,0,0,n,s,e,t,n*v,s*v),m.toBlob(e=>{a.files=[e],a.dispatchEvent(new CustomEvent("change"))})},E=function(e){const t=(e.target.files||e.dataTransfer.files)[0];-1===t.type.indexOf(o.replace("*",""))&&alert("file type invalid!");const n=URL.createObjectURL(t);(g=new Image).addEventListener("load",e=>{y()}),g.src=n,m.focus(),b(e)};m.addEventListener("mousewheel",e=>{e.deltaY>0?v+=l:v-=l,y(),b(e)}),m.addEventListener("keydown",e=>{switch(e.keyCode){case 37:f.x--;break;case 38:f.y--;break;case 39:f.x++;break;case 40:f.y++;break;case 187:v+=l;break;case 189:v-=l}y(),b(e)},!1);let w=null;const L=e=>{const t=e.touches?e.touches[0]:e,{clientX:n,clientY:a}=t;w={clientX:n,clientY:a}},x=e=>{if(w){const t=e.touches?e.touches[0]:e,{clientX:n,clientY:a}=t;f.x+=n-w.clientX,f.y+=a-w.clientY,y(),w={clientX:n,clientY:a}}},k=e=>{w=null};m.addEventListener("touchstart",L),m.addEventListener("mousedown",L),m.addEventListener("touchmove",x),m.addEventListener("mousemove",x),m.addEventListener("touchend",k),m.addEventListener("mouseup",k);const C=e("label",{onDragEnter:b,onDragOver:b,onDragEnd:b,onDrop:E},e("input",{type:"file",accept:o,name:d,style:{display:"none"},onChange:E}),e("span",null,c.trim()||"Click or Drop image file here")),D=this.attachShadow({mode:"open"});D.appendChild(e("style",null,n)),D.appendChild(e("div",{className:`${t} ${s}`,title:i},C,m))}})}();
//# sourceMappingURL=bundle.js.map