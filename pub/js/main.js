"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var url=new Object;function Createdimg(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?"images/"+e+"_full.png":"images/"+e+".jpg"}function createImages(e){for(var t,n=document.getElementById("wrapper"),r={},a=0,i=[];a<e.length;)Object.keys(e[a]).forEach((function(t){"website_ID"!=t&&"titel_website"!=t||(r[t]=e[a][t])})),i.push(r),r={},a++;var o;document.createElement("div").className="img-container",(o=document.createElement("section")).className="img-content",o.id="projects",(t=document.createElement("div")).className="max-width";for(var l=0;l<i.length;l++){var s=document.createElement("div");s.className="img-container",s.innerHTML="<img src='"+Createdimg(i[l].titel_website)+"' alt='"+i[l].titel_website+"' id='"+i[l].website_ID+"'>",t.appendChild(s),o.appendChild(t)}n.insertBefore(o,document.getElementById("Aboutme")),document.querySelectorAll(".img-container").forEach((function(e){var t=document.createElement("h3");t.id="image-text",t.innerHTML=e.firstChild.alt,e.addEventListener("mouseover",(function(n){e.appendChild(t);var r=e.offsetHeight-e.firstChild.offsetHeight;t.style.bottom=r+"px";var a=e.offsetWidth-e.firstChild.offsetWidth;t.style.width=e.offsetWidth-a+"px",n.stopPropagation()})),e.addEventListener("mousemove",(function(t){t.stopPropagation();var n=e.clientHeight,r=e.clientWidth,a=t.layerX,i="perspective(500px) scale(1.1) rotateX("+(t.layerY-n/2)/n*-20+"deg) rotateY("+(a-r/2)/r*20+"deg)";e.style.transform=i})),e.addEventListener("mouseleave",(function(){t.remove(),e.style.transform="perspective(500px) rotateX(0) rotateY(0)"})),e.addEventListener("click",(function(t){t.stopPropagation(),window.location.href="work.html?ID="+e.firstChild.getAttribute("id")}))}))}function getData(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];t=r?n:url.adress+e,fetch(t,{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(t){200===t.status?t.json().then((function(t){a?displayData(t,e):createImages(t)})):console.log("Unable to retrive data")})).catch((function(e){return console.error("Fetch error:",e)}))}function displayData(e,t){var n,r,a,i,o,l,s,c,d,m,u,h,p,g=0;if(!e[0].COLUMN_name){for("website"!==t?(o=document.getElementById("max-About"),l=!1):(o=document.getElementById("wrapper"),l=!0,(d=document.createElement("section")).id="website",u=["Titel","Description"],h=0),l?(s=Createdimg(e[0].titel_website,!0),(c=document.createElement("img")).setAttribute("src",s),c.setAttribute("alt",e[0].titel_website),(m=document.createElement("div")).className="max-width"):((i=document.createElement("h3")).innerHTML=t,i.className="displaySkill",(n=document.createElement("article")).className="skill",(p=document.createElement("div")).className="listcontainer");e.length>g&&!(g>3);)l?(n=document.createElement("article"),(a=document.createElement("div")).className="button"):r=document.createElement("ul"),Object.keys(e[g]).forEach((function(t){l||0==g&&n.appendChild(i),t.includes("ID")||(l?t.includes("url")||(h<2&&(n.innerHTML+="<h3> "+u[h]+"</h3>",h++),n.innerHTML+="<h4> "+e[g][t]+"</h4> "):r.innerHTML+="<li> "+e[g][t]+"</li> ")})),l?(a.innerHTML="<a href='"+e[0].url+"' target='_blank'>Visit page</a>",n.appendChild(a),m.appendChild(n),m.appendChild(c),d.appendChild(m),o.appendChild(d)):(p.appendChild(r),i.appendChild(p),o.appendChild(n)),g++;document.querySelectorAll(".displaySkill").length>0&&$(".displaySkill").unbind("click").click((function(e){event.stopPropagation(),$(this).find("div").slideToggle("slow",(function(){}))}))}}function animating(e){for(var t=_toConsumableArray(document.getElementById(e).childNodes).filter((function(e){return e.childNodes.length>0})),n=0,r=1;r<t.length;r++)t[r].style.animation="slide-up 1.2s ease-in "+n+"s",n+=.5}function getURLVariables(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if(r[0]===e)return r[1]}return!1}function displayError(e,t){var n,r=document.getElementById(t);document.getElementById("Error-message")&&document.getElementById("Error-message").remove(),document.getElementById("Error-message")||((n=document.createElement("div")).id="Error-message"),n.innerHTML+="<h3>".concat(e[0]," </h3>");for(var a=1;a<e.length;a++)n.innerHTML+="<h4>".concat(e[a]," </h4>");r.appendChild(n)}url.adress="http://studenter.miun.se/~olan1700/dt057g/portfolio/server/index.php/",document.querySelector(".hamburger").addEventListener("click",(function(){var e=document.querySelector("nav"),t=this.getBoundingClientRect(),n=window.innerWidth-t.right;"hamburger"==this.className?(e.style.top="0%",this.className="hamburger hamburger--collapse is-active",this.style.position="fixed",this.style.right=n+"px"):(this.style.position="static",e.style.top="-150%",this.className="hamburger")})),document.querySelectorAll("nav ul li").forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation();var t=document.querySelector(".hamburger"),n=document.querySelector("nav");"hamburger hamburger--collapse is-active"==t.className&&(n.style.top="-150%",t.style.position="static",t.className="hamburger")}))})),$(document).ready((function(){$("a").on("click",(function(e){if(""!==this.hash){e.preventDefault();var t=this.hash;$("html, body").animate({scrollTop:$(t).offset().top},1200,(function(){window.location.hash=t}))}})),$("#scrolling-container").on("click",(function(){$("html, body").animate({scrollTop:$("#projects").offset().top},1200,(function(){window.location.hash="#projects"}))}))})),window.onload=function(){if(document.getElementById("infocontainer")&&animating("infocontainer"),document.getElementById("Aboutme")&&(getData("website","",!1,!1),getData("education","",!1,!0),getData("work","",!1,!0)),document.getElementById("imgAbout")&&document.addEventListener("scroll",(function(){var e=document.getElementById("Aboutme"),t=window.pageYOffset+window.innerHeight,n=document.querySelector("#imgAbout img"),r=t>e.offsetTop;n.className=r?"imgAnimation":"portrait"})),getURLVariables("ID")){var e=getURLVariables("ID");getData("website",url.adress+"website?ID="+e,!0)}document.getElementById("contact-form")&&document.getElementById("contact-form").addEventListener("submit",(function(e){var t=[];t.push("There was an error!"),_toConsumableArray(this.elements).forEach((function(e){0==e.value.length?t.push("Field ".concat(e.name," is empty")):"message"==e.name&&e.value.length<50&&t.push("Message need to be atleast 50 charcater long")})),t.length>1?(e.preventDefault(),displayError(t,"wrapper")):alert("You did it!")}))};