(function(){"use strict";var e={2177:function(e,t,s){s(6992),s(8674),s(9601),s(7727);var n=s(144),a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[e.isFull?e._e():s("button",{staticStyle:{"font-size":"24pt",position:"absolute",right:"0",top:"0"},on:{click:function(t){return e.goFullscreen(!0)}}},[e._v(" fullscreen ")]),"starting"===e.state?s("section",[e._m(0),s("p",[e._v("select amount of players:")]),s("div",{staticClass:"flex set-players"},[s("button",{staticClass:"grow orange",on:{click:function(t){return e.setPlayers(3)}}},[e._v("3")]),s("button",{staticClass:"grow red",on:{click:function(t){return e.setPlayers(4)}}},[e._v("4")]),s("button",{staticClass:"grow violet",on:{click:function(t){return e.setPlayers(5)}}},[e._v("5")])]),s("h2",[e._v("how to play 👇")]),e._m(1)]):s("section",{staticClass:"board"},[s("div",{attrs:{id:"flipsville"}},[e.flippedCard?s("button",{staticStyle:{background:"none","font-size":"5vw"},attrs:{id:"flipped-card",disabled:"end"!==e.flippedCard.type},on:{click:function(t){return e.flip()}}},[s("card",{staticStyle:{height:"100%"},attrs:{card:e.flippedCard}})],1):s("button",{attrs:{id:"flip-btn",disabled:"end"===e.state},on:{click:function(t){return e.flip()}}},[e._v(" FLIP ")]),s("p",{staticStyle:{"font-size":"5vh",display:"flex","flex-direction":"column","justify-content":"space-between",margin:"0"}},["end"===e.state?s("span",[s("span",[e._v("Game Over")]),s("button",{on:{click:function(t){return e.newGame()}}},[e._v("New Game")])]):e.flippedCard?s("span",["end"===e.flippedCard.type?s("span",[e._v(" Final round! ")]):s("span",[e._v(" Choose place ")])]):s("span",[e._v(" Flip or Take ")]),s("span",[e._v(" Scoring "),s("score")],1)])]),s("div",{class:{three:3===e.numPlayers,four:4===e.numPlayers,five:5===e.numPlayers}},e._l(e.lanes,(function(t,n){return s("div",{key:n,staticClass:"row"},["add"!==e.substate||t.picked?"end"===e.state||"take"!==e.substate||t.picked?s("button",{class:{strikeout:t.picked},staticStyle:{"white-space":"nowrap"},attrs:{disabled:""}},[e._v(" LANE "+e._s(n+1)+" ")]):s("button",{staticClass:"take",attrs:{disabled:0===t.length},on:{click:function(t){return e.take(n)}}},[e._v(" "+e._s(0===t.length?"LANE":"TAKE")+" "+e._s(n+1)+" ")]):s("button",{staticStyle:{"white-space":"nowrap"},attrs:{disabled:3===t.length},on:{click:function(t){return e.add(n)}}},[e._v(" DROP "+e._s(n+1)+" ")]),e._l(t,(function(e,t){return s("card",{key:t,attrs:{card:e,rotate:!0}})}))],2)})),0),s("transition-group",{class:{three:3===e.numPlayers,four:4===e.numPlayers,five:5===e.numPlayers},attrs:{name:"list-complete"}},e._l(e.players,(function(t){return s("div",{key:t.name,staticClass:"player list-complete-item",class:{done:t.done}},[s("span",{staticClass:"nums"},[t.blue?s("span",{staticClass:"num blue"},[e._v(e._s(t.blue))]):e._e(),t.red?s("span",{staticClass:"num red"},[e._v(e._s(t.red))]):e._e(),t.orange?s("span",{staticClass:"num orange"},[e._v(e._s(t.orange))]):e._e(),t.yellow?s("span",{staticClass:"num yellow"},[e._v(e._s(t.yellow))]):e._e(),t.brown?s("span",{staticClass:"num brown"},[e._v(e._s(t.brown))]):e._e(),t.green?s("span",{staticClass:"num green"},[e._v(e._s(t.green))]):e._e(),t.violet?s("span",{staticClass:"num violet"},[e._v(e._s(t.violet))]):e._e(),t.wild?s("span",{staticClass:"num wild"},[e._v(e._s(t.wild))]):e._e(),t.plus2?s("span",{staticClass:"num plus2"},[e._v(e._s(t.plus2))]):e._e()]),s("span",{staticClass:"name",attrs:{contenteditable:""}},[e._v(e._s(t.name))]),s("span",{staticClass:"score"},[e._v(e._s(t.score))])])})),0)],1)])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("h1",[s("span",{staticStyle:{color:"red"}},[e._v("C")]),s("span",{staticStyle:{color:"blue"}},[e._v("o")]),s("span",{staticStyle:{color:"#804000"}},[e._v("l")]),s("span",{staticStyle:{color:"green"}},[e._v("o")]),s("span",{staticStyle:{color:"yellow"}},[e._v("r")]),s("span",{staticStyle:{color:"#7F00FF"}},[e._v("s")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("p",{staticClass:"small"},[e._v(" Get the most points by collecting as much of the same color as possible. A large variety of colors will lower your score. "),s("span",{staticClass:"wild-text"},[e._v("Wilds")]),e._v(" are automatically counted as the highest scoring color. The "),s("span",{staticClass:"plus2"},[e._v("2 cards")]),e._v(" give you 2 points. ")])}],l=(s(561),s(8309),s(1539),s(4747),s(2707),function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)}),i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"score"},[s("span",[e._v("1")]),s("span",[e._v("1")]),s("span",[e._v("2")]),s("span",[e._v("3")]),s("span",[e._v("3")]),s("span",[e._v("6")]),s("span",[e._v("4")]),s("span",[e._v("10")]),s("span",[e._v("5")]),s("span",[e._v("15")]),s("span",[e._v("6")]),s("span",[e._v("21")])])}],o=s(1001),c={},u=(0,o.Z)(c,l,i,!1,null,"040aecdf",null),d=u.exports,p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"card"},["blue"===e.card.color?s("div",{staticClass:"blue"},[e._v("B")]):e._e(),"brown"===e.card.color?s("div",{staticClass:"brown"},[e._v("Br")]):e._e(),"green"===e.card.color?s("div",{staticClass:"green"},[e._v("G")]):e._e(),"orange"===e.card.color?s("div",{staticClass:"orange"},[e._v("O")]):e._e(),"red"===e.card.color?s("div",{staticClass:"red"},[e._v("R")]):e._e(),"violet"===e.card.color?s("div",{staticClass:"violet"},[e._v("V")]):e._e(),"yellow"===e.card.color?s("div",{staticClass:"yellow"},[e._v("Y")]):e._e(),"wild"===e.card.type?s("div",{staticClass:"wild"},[e._v("W")]):e._e(),"plus2"===e.card.type?s("div",{staticClass:"plus2"},[e._v("2")]):e._e(),"end"===e.card.type?s("div",{staticClass:"end"},[e._v("END")]):e._e()])},f=[],h={name:"Card",props:["card","rotate"]},v=h,_=(0,o.Z)(v,p,f,!1,null,"76f473bc",null),y=_.exports;window.onbeforeunload=function(){return!0};var m=["blue","brown","green","orange","red","violet","yellow"],k={name:"app",components:{Score:d,Card:y},data:function(){return{state:"starting",substate:"take",numPlayers:0,flippedCard:null,endOfGame:!1,players:[],deck:[],lanes:[],isFull:!1}},computed:{},methods:{newGame:function(){var e=this;this.substate="take",this.flippedCard=null,this.endOfGame=!1,this.lanes=[],this.buildDeck();var t=this.players;this.players=[];for(var s=function(s){e.lanes.push([]),e.players.push({name:t[s].name,score:0,plus2:0,wild:0}),m.forEach((function(t){return e.players[s][t]=0}))},n=0;n<this.numPlayers;n++)s(n);this.shuffle(this.deck),this.deck.splice(this.deck.length-15,0,{type:"end"}),this.state="playing"},setPlayers:function(e){var t=this;this.numPlayers=e,this.buildDeck();for(var s=function(e){t.lanes.push([]),t.players.push({name:"P".concat(e+1),score:0,plus2:0,wild:0}),m.forEach((function(s){return t.players[e][s]=0}))},n=0;n<e;n++)s(n);this.shuffle(this.deck),this.deck.splice(this.deck.length-15,0,{type:"end"}),this.state="playing"},buildDeck:function(){this.deck=[];for(var e=3===this.numPlayers?6:7,t=0;t<e;t++)for(var s=0;s<7;s++)this.deck.push({type:"color",color:m[t]});for(var n=0;n<10;n++)this.deck.push({type:"plus2"});for(var a=0;a<3;a++)this.deck.push({type:"wild"})},shuffle:function(e){var t,s,n=e.length;while(0!==n)s=Math.floor(Math.random()*n),n-=1,t=e[n],e[n]=e[s],e[s]=t;return e},start:function(){this.state="playing"},getRandomInt:function(e){return Math.floor(Math.random()*Math.floor(e))},flip:function(){if(!this.flippedCard||"end"===this.flippedCard.type){for(var e=!1,t=0;t<this.lanes.length;t++)if(!this.lanes[t].picked&&this.lanes[t].length<3){e=!0;break}e&&(this.flippedCard=this.deck.splice(0,1)[0],"end"!==this.flippedCard.type?this.substate="add":this.endOfGame=!0)}},add:function(e){this.flippedCard&&"end"!==this.flippedCard.type&&(e<0||e>this.lanes.length-1||this.lanes[e].picked||this.lanes[e].length>=3||(this.lanes[e].push(this.flippedCard),this.flippedCard=null,this.substate="take",this.nextPlayer()))},take:function(e){if(!(e<0||e>this.lanes.length-1)&&!this.lanes[e].picked){if(0===this.lanes[e].length)return 0;this.lanes[e].picked=!0;var t=this.players[0];if(this.lanes[e].forEach((function(e){"color"===e.type?t[e.color]++:t[e.type]++})),this.lanes[e].length=0,t.done=!0,this.calc(this.players[0]),!this.players.some((function(e){return!e.done})))return this.endOfGame?void(this.state="end"):(this.lanes.forEach((function(e){return e.picked=!1})),void this.players.forEach((function(e){return e.done=!1})));this.nextPlayer()}},nextPlayer:function(){var e=this.players.splice(0,1)[0];this.calc(e),this.players.push(e);while(this.players[0].done)e=this.players.splice(0,1)[0],this.players.push(e)},calc:function(e){var t=[];m.forEach((function(s){return t.push(e[s])})),t.sort((function(e,t){return t-e}));for(var s=0;s<e.wild;s++)t[0]<6?t[0]++:t[1]<6?t[1]++:t[2]<6&&t[2]++;e.score=0;for(var n=0;n<t.length;n++)n<3?e.score+=this.scoreCard(t[n]):e.score-=this.scoreCard(t[n]);e.score+=2*e.plus2},scoreCard:function(e){return e<2?e:2===e?3:3===e?6:4===e?10:5===e?15:21},isFullScreen:function(){var e=function(e){return e&&null!==e};this.isFull=e(document.fullscreenElement)||e(document.webkitFullscreenElement)||e(document.mozFullScreenElement)||e(document.msFullscreenElement)},goFullscreen:function(e){if(!0!==e)document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();else{var t=document.body,s=t.requestFullScreen||t.webkitRequestFullScreen||t.mozRequestFullScreen||t.msRequestFullScreen;s&&s.call(t)}},addOrTake:function(e){this.flippedCard?this.add(e):this.take(e)}},mounted:function(){var e=this;setInterval(this.isFullScreen,1e3),window.addEventListener("keypress",(function(t){"end"!==e.state&&("f"===t.key?e.flip():"1"===t.key?e.addOrTake(0):"2"===t.key?e.addOrTake(1):"3"===t.key?e.addOrTake(2):"4"===t.key?e.addOrTake(3):"5"===t.key&&e.addOrTake(4))}))}},b=k,C=(0,o.Z)(b,a,r,!1,null,null,null),g=C.exports;n.Z.config.productionTip=!1,new n.Z({render:function(e){return e(g)}}).$mount("#app")}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.m=e,function(){var e=[];s.O=function(t,n,a,r){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],r=e[u][2];for(var i=!0,o=0;o<n.length;o++)(!1&r||l>=r)&&Object.keys(s.O).every((function(e){return s.O[e](n[o])}))?n.splice(o--,1):(i=!1,r<l&&(l=r));if(i){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,a,r]}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,r,l=n[0],i=n[1],o=n[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(a in i)s.o(i,a)&&(s.m[a]=i[a]);if(o)var u=o(s)}for(t&&t(n);c<l.length;c++)r=l[c],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(u)},n=self["webpackChunkcolors"]=self["webpackChunkcolors"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(2177)}));n=s.O(n)})();
//# sourceMappingURL=app-legacy.5009bc21.js.map