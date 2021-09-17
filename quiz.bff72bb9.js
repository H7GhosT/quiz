!function(){function e(e){const t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild}function t(){return performance.now().toString(36)}class i{constructor(e,t,{required:i,placeholder:s,value:n}){this.$element=t,this.$input=this.$element.querySelector("[data-input]"),this.$input.required=i,s&&(this.placeholder=s),n&&(this.value=n),this.$input.addEventListener("focus",(()=>{this.$element.classList.add("has-text","active")})),this.$input.addEventListener("blur",(()=>{this.value||this.placeholder||this.$element.classList.remove("has-text"),this.$element.classList.remove("active"),this.onBlur()})),this.onInput=()=>{},this.onBlur=()=>{},this.$element.querySelector("[data-input]").addEventListener("input",(()=>{this.multiline&&this._resize(),this.onInput()})),e.replaceWith(this.$element)}set value(e){this.$input.value=e,e?this.$element.classList.add("has-text"):this.$element.classList.remove("has-text"),this.multiline&&this._resize()}get value(){return this.$input.value}set placeholder(e){this.$input.placeholder=e,e?this.$element.classList.add("has-text"):this.$element.classList.remove("has-text")}get placeholder(){return this.$input.placeholder}focus(){this.$input.focus(),this.$input.scrollIntoView({block:"center",behavior:"smooth"})}blur(){this.$input.blur()}reportValidity(){const e=this.$input.reportValidity();return e||this.$input.scrollIntoView({block:"center",behavior:"smooth"}),e}}class s extends i{constructor(t,{placeholder:i="",value:s="",label:n="",required:l=!1}){super(t,e(`\n        <div class="ol-text-field">\n          <input class="ol-text-field__input" type="text" data-input />\n          ${n?`<span class="ol-text-field__label">${n}</span>`:""}\n        </div>\n    `),{required:l,value:s,placeholder:i})}}class n extends i{constructor(t,{placeholder:i="",value:s="",multiline:n=!1,required:l=!1,disableEnter:o=!1}){super(t,e(`\n        <div class="ul-text-field">\n        ${n?'<textarea role="textbox" class="ul-text-field__input" data-input ></textarea>':'<input class="ul-text-field__input" type="text" data-input />'}\n        </div>\n    `),{required:l,placeholder:i}),this.multiline=n,this.value=s,this.multiline&&o&&this.$input.addEventListener("keydown",(e=>{13==e.keyCode&&e.preventDefault()}))}_resize(){const t=e("<div><pre></pre></div>"),i=t.querySelector("pre"),s=window.getComputedStyle(this.$input);i.innerText=this.value+" ",i.style.fontSize=s.fontSize,i.style.fontFamily=s.fontFamily,i.style.fontWeight=s.fontWeight,t.style.width=this.$input.clientWidth+"px",i.style.whiteSpace="pre-wrap",i.style.wordWrap="break-word",t.style.visibility="hidden",document.body.appendChild(t),this.$input.style.height=i.clientHeight+"px",t.remove()}}class l{constructor(e,{name:i,multiple:s,items:n,editable:l=!1}){this.$element=document.createElement("div"),this.multiple=s,this.editable=l,this.name=i||"checklist_"+t(),this.items=[],e.replaceWith(this.$element),this.onChange=()=>{},this.onRemove=()=>{};for(const e of n)this.addItem(e);return this}addItem({value:i,checked:s=!1}){const l=this.multiple?"checkbox":"radio";let o="item_"+t();const a={key:o,value:i,get checked(){return!!this.$input.checked},set checked(e){this.$input.checked=e},$input:null,textField:null,$element:e(`\n        <div>\n          <label for="${o}" class="checklist-item ${this.editable?"editable":""}">\n            <input ${s?"checked":""} type="${l}" name="${this.name}" id="${o}"/>\n            <div class="${l}__mark"></div>\n            <div class="checklist-item__value">${i}</div>\n            ${this.editable?'<span class="spacex-1"></span>\n                  <button type="button" class="checklist-item__remove cross-btn secondary small"></button>':""}\n          </label>\n        </div>\n    `)};return a.$input=a.$element.querySelector("input"),a.checked=s,a.$input.addEventListener("change",(()=>{this.onChange({...a})})),this.$element.appendChild(a.$element),this.items.push(a),this.editable&&(a.textField=new n(a.$element.querySelector(".checklist-item__value"),{multiline:!0,placeholder:"Option",value:a.value,required:!0}),a.textField.onInput=()=>{a.value=a.textField.value,this.onChange({...a})},a.$element.querySelector(".checklist-item__remove").addEventListener("click",(()=>{this.removeItem(a)}))),a}removeItem({key:e=null,value:t=null,$element:i=null}){let s=null;this.items.splice(this.items.findIndex((n=>{if(n.key==e||n.value==t||n.$element==i)return s=n,n.$element.remove(),!0})),1),s&&this.onRemove({...s})}reportValidity(){let e=this.items.every((e=>e.textField.reportValidity()));return e&&(e=-1!=this.items.findIndex((e=>e.$input.checked)),e||(this.items[0].$input.setCustomValidity("Please check at least 1 item"),this.items[0].$input.reportValidity(),this.items[0].$input.scrollIntoView({block:"center",behavior:"smooth"}))),e}}class o{constructor(e,{text:t="",values:i={},disabled:s=!1}){this.$element=document.createElement("div"),this.onInput=()=>{},this._disabled=s,this.setText({text:t,values:i}),e.replaceWith(this.$element)}setText({text:t,values:i}){this.$element.innerHTML="",this.text=t,this.values={...i},this.$content=e(t),this.$content&&(this.$content.querySelectorAll("c").forEach((t=>{const s=t.getAttribute("width"),n=t.getAttribute("id"),l=document.createElement("span"),o=e(`<input data-id="${n}" class="inline-text-field" type="text" maxlength="${s}" ${this._disabled?"disabled":""} />`);l.style.visibility="hidden",l.style.position="absolute",l.innerText="m".repeat(s),l.style.fontSize=o.style.fontSize="1rem",l.style.fontFamily=o.style.fontFamily="monospace",document.body.appendChild(l),o.style.width=l.clientWidth+"px",o.value=i[n]||"",o.addEventListener("input",(()=>{this.values[n]=o.value,this.onInput({id:n,value:o.value})})),t.replaceWith(o),l.remove()})),this.$element.appendChild(this.$content),this.$content.style.whiteSpace="pre-wrap",this.$content.style.wordWrap="break-word")}}class a{constructor(t,{left:i=[],right:s=[],connections:n=[],editable:l=!1}){this._canvasWidth=100,this.$element=e(`\n      <div class="match">\n        <div class="match__side match__side--left"></div>\n        <canvas class="match__middle" width="${this._canvasWidth}" height="0"></canvas>\n        <div class="match__side match__side--right"></div>\n      </div>\n    `),t.replaceWith(this.$element),this.$left=this.$element.querySelector(".match__side--left"),this.$right=this.$element.querySelector(".match__side--right"),this.$middle=this.$element.querySelector(".match__middle"),this._selected=[null,null],this._ctx=this.$middle.getContext("2d"),this._connections=[],this.left=[],this.right=[],this.editable=l;for(let e of i)this.addLeft(e);for(let e of s)this.addRight(e);this.connections=n.map((e=>[...e])),this.onNewConnection=([e,t])=>{},this.onRemoveConnection=([e,t])=>{},this.onRemove=({sideName:e,item:t})=>{},this.onChange=({sideName:e,item:t})=>{}}_drawConnections(){this._ctx.clearRect(0,0,this._ctx.canvas.width,this._ctx.canvas.height);for(const e of this._connections){if(!this.left[e[0]]||!this.right[e[1]])continue;const t=this.left[e[0]].$btn,i=this.right[e[1]].$btn,s=t.getBoundingClientRect(),n=i.getBoundingClientRect(),l=this.$middle.getBoundingClientRect().top,o=s.top+s.height/2-l,a=n.top+n.height/2-l;this._ctx.lineWidth=4,this._ctx.strokeStyle="#00a8a8",this._ctx.beginPath(),this._ctx.moveTo(0,o),this._ctx.lineTo(this._ctx.canvas.width,a),this._ctx.stroke(),t.classList.add("match-button--active"),i.classList.add("match-button--active"),t.blur(),i.blur()}}set connections(e){this._connections=e,this._drawConnections()}get connections(){return this._connections}addConnection(e){this._removeConnectionHelper(e),this._connections.push([...e]),this.connections=this._connections,this.onNewConnection([...e])}removeConnection(e){const t=this._removeConnectionHelper(e);this.connections=this._connections,this.onRemoveConnection(t)}_removeConnectionHelper(e){let t=[];return this._connections=this._connections.filter((i=>i[0]!=e[0]&&i[1]!=e[1]||(t=[...i],this.left[i[0]].$btn.classList.remove("match-button--active"),this.right[i[1]].$btn.classList.remove("match-button--active"),!1))),t}addLeft(e){return this._addToSide(e,"left")}addRight(e){return this._addToSide(e,"right")}removeLeft(e){const t=this._removeSide(e,"left");return this.onRemove({sideName:"left",removed:t}),t}removeRight(e){const t=this._removeSide(e,"right");return this.onRemove({sideName:"right",removed:t}),t}_removeSide(e,t){let i=this[t],s="left"==t?0:1;this.removeConnection("left"==t?[e,null]:[null,e]);for(const t of this._connections)t[s]>e&&t[s]--;this._selected[s]==e&&(this._selected[s]=null);const n=i.splice(e,1)[0];n.$element.remove();for(let t=e;t<i.length;t++)i[t].key--;return this._adjustHeight(),n}_addToSide(t,i){const s=this["$"+i],l=this[i];let[o,a]="left"==i?[0,1]:[1,0];const r={key:l.length,value:t,$element:e(`\n        <div class="match-button__wrapper match-button__wrapper--${i}">\n          <button class="match-button match-button--${i}">\n            <div class="match-button__value">${t}</div>\n          </button>\n          ${this.editable?'<button type="button" class="match-button__remove cross-btn secondary x-small"></button>':""}\n        </div>\n      `),$btn:null};return r.$btn=r.$element.querySelector(".match-button"),s.appendChild(r.$element),this.editable&&(r.textField=new n(r.$btn.querySelector(".match-button__value"),{multiline:!0,disableEnter:!0,value:t,placeholder:i.charAt(0).toUpperCase()+i.slice(1),required:!0}),r.textField.onInput=()=>{r.value=r.textField.value,this._adjustHeight(),this.onChange({sideName:i,item:r})},r.$element.querySelector(".match-button__remove").addEventListener("click",(()=>{const e=this._removeSide(r.key,i);this.onRemove({item:e,sideName:i})}))),r.$btn.addEventListener("focus",(e=>{this._selected[o]=r.key,this.removeConnection("left"==i?[r.key,null]:[null,r.key]),null!=this._selected[a]&&(this.addConnection([this._selected[0],this._selected[1]]),this._selected=[null,null])})),r.$btn.addEventListener("blur",(()=>{setTimeout((()=>{this._selected[o]==r.key&&(this._selected[o]=null)}),10)})),this._adjustHeight(),l.push(r),r}_adjustHeight(){this.$middle.height=0,this.$middle.height=this.$element.clientHeight,this._drawConnections()}reportValidity(){if(this.editable){let e=this.left.every((e=>e.textField.reportValidity()))&&this.right.every((e=>e.textField.reportValidity()));return e&&!this._connections.length&&(e=!1,this.left[0].$btn.setCustomValidity("There should be at least 1 connection"),this.left[0].$btn.reportValidity(),this.left[0].$btn.scrollIntoView({block:"center",behavior:"smooth"})),e}return!0}}class r{constructor(t,{value:i,total:s}){this._value=i,this._total=s,this.$element=e('\n    <div class="progress">\n      <div class="progress__text">\n      </div>\n      <div class="progress__bar">\n      </div>\n    </div>\n  '),this._updateProgress(),t.replaceWith(this.$element)}set value(e){this._value=e,this._updateProgress()}get value(){return this._value}set total(e){this._total=e,this._updateProgress()}get total(){return this._total}_updateProgress(){const t=this.$element.querySelector(".progress__text"),i=this.$element.querySelector(".progress__bar");t.innerText=`${this.value} of ${this.total}`,i.innerHTML="";for(let t=1;t<=this.value;t++)i.append(e('<div class="progress__bit progress__bit--done"></div>'),e('<div class="spacex-1px"></div>'));for(let t=this.value+1;t<this.total;t++)i.append(e('<div class="progress__bit"></div>'),e('<div class="spacex-1px"></div>'));this.value<this.total&&i.append(e('<div class="progress__bit"></div>'))}}class c{constructor(t,{quest:i,progress:n,onNext:r,onPrev:c,onFinish:h}){this.$element=e(`\n      <div class="quiz-section">\n        <div class="paper-4 quiz-section__wrapper">\n          <div class="title primary">\n            ${i.title}\n          </div>\n          <div class="spacey-2"></div>\n          <div class="subtitle">\n            ${i.question}\n          </div>\n          <div class="spacey-1"></div>\n          <div class="quiz-section__content"></div>\n          <div class="spacey-2"></div>\n          <div class="space-between">\n            <div class="progress"></div>\n            <div class="quiz-section__buttons"></div>\n          </div>\n        </div>\n      </div>\n    `),t.replaceWith(this.$element),this.$quizSectionWrap=this.$element.querySelector(".quiz-section__wrapper"),this.$buttonsContainer=this.$element.querySelector(".quiz-section__buttons"),this.updateProgress(n.value,n.total),this.onNext=r||(()=>{}),this.onPrev=c||(()=>{}),this.onFinish=h||(()=>{}),this.$content=this.$element.querySelector(".quiz-section__content");const d={question:()=>{const e=document.createElement("div");this.$content.appendChild(e);const t=new s(e,{value:i.answer||"",label:"Your answer"});t.onInput=()=>{i.answer=t.value}},choose:e=>{const t=document.createElement("form");t.onsubmit=e=>e.preventDefault();const s=document.createElement("div");this.$content.appendChild(t),t.appendChild(s),i.answers||(i.answers=[]);const n=new l(s,{multiple:e,items:i.options.map(((e,t)=>({value:e,checked:i.answers.includes(t+1)})))});n.onChange=()=>{i.answers=[],n.items.forEach(((e,t)=>{e.checked&&i.answers.push(t+1)}))}},"choose one":function(){this.choose(!1)},"choose multiple":function(){this.choose(!0)},complete:()=>{i.answers||(i.answers={});const e=document.createElement("div");this.$content.append(e);new o(e,{values:i.answers,text:i.text}).onInput=({id:e,value:t})=>{i.answers[e]=t}},match:()=>{i.answers||(i.answers=[]);const e=document.createElement("div");this.$content.appendChild(e);const t=new a(e,{left:i.left,right:i.right,connections:i.answers.map((([e,t])=>[e-1,t-1]))});t.onChange=t.onRemove=t.onNewConnection=t.onRemoveConnection=()=>{i.left=t.left.map((e=>e.value)),i.right=t.right.map((e=>e.value)),i.answers=t.connections.map((e=>[e[0]+1,e[1]+1]))}}};d[i.type]&&d[i.type]()}updateProgress(t,i){let s,n,l;this.progress=new r(this.$element.querySelector(".progress"),{value:t,total:i}),this.$buttonsContainer.innerHTML="",t>1&&this.$buttonsContainer.append(s=e('<button class="text-button secondary">prev</button>'),e('<span class="spacex-1"></span>')),t<i&&this.$buttonsContainer.appendChild(n=e('<button class="filled-button primary">next</button>')),t==i&&this.$buttonsContainer.appendChild(l=e('<button class="filled-button success">finish</button>')),s&&s.addEventListener("click",(()=>this.onPrev())),n&&n.addEventListener("click",(()=>this.onNext())),l&&l.addEventListener("click",(()=>this.onFinish()))}remove(){this.$element.remove()}}let h={name:"My first quiz",quests:[{title:"Answer the question",type:"question",question:"What is the name of the first function called when executing a C++ program?",correctAnswers:["main"],answer:""},{title:"Choose the right answer",type:"choose one",question:"What is the time complexity of 'Binary search'?",options:["O(1)","O(n)","O(log n)","O(n log n)"],correctAnswers:[3]},{title:"Choose the right answers",type:"choose multiple",question:"What may be the result of a sorting algorithm applied on an set of numbers?",options:["[1, 4, 5, 3, 10, 14]","[55, 90, 91, 123, 241]","[62, 42, -1, -2, -99]"],correctAnswers:[2,3]},{title:"Complete empty spaces",type:"complete",question:'Write a function named "Hello" that prints "Hello world" to the console and something more here',text:'<pre>function <span><c id="1" width="5" /></span>() {\n  console.<span><c id="2" width="3"/></span>(<span><c id="3" width="13"/></span>);\n}</pre>',correctAnswers:{1:"Hello",2:"log",3:'"Hello world"'}},{title:"Match the sides",type:"match",question:"Match the size of given types",left:["int","char","short"],right:["8 bits","16 bits","32 bits"],correctAnswers:[[1,3],[2,1],[3,2]]}]};for(const e of h.quests)e.answer=null,e.answers=null;!function(){const e=document.querySelector("#quiz");let t=function i(s){const n=document.createElement("div");return e.innerHTML="",e.appendChild(n),{quizSection:new c(n,{progress:{value:s+1,total:h.quests.length},quest:h.quests[s],onPrev:()=>{t.questIdx>0&&(t=i(t.questIdx-1))},onNext:()=>{t.questIdx<h.quests.length-1&&(t=i(t.questIdx+1))}}),questIdx:s}}(0)}()}();
//# sourceMappingURL=quiz.bff72bb9.js.map