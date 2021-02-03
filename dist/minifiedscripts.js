let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=898";function n(e){t.push(e)}let o=document.querySelector("#spinner");function i(){o.removeAttribute("hidden")}function r(){o.setAttribute("hidden","")}function s(t){a(t).then(function(){!function(t){let e=$(".modal-body"),n=$(".modal-title");n.empty(),e.empty();let o=$("<h1>"+t.name+"  #"+t.id+"</h1>"),i=$("<img class='modal-img' style='width:75%'>");i.attr("src",t.imageUrl);let r=$("<p>Height: "+t.height/.1+" cm</p>"),s=$("<p>Weight: "+t.weight/10+" kg</p>"),a=$("<p>"+function(t){return t.types.length>1?"Types: "+t.types.join(", "):"Type: "+t.types}(t)+"</p>");e.append(i),n.append(o),e.append(r),e.append(s),e.append(a)}(t)})}function a(t){i();let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){r(),t.id=e.id,t.imageUrl=e.sprites.other["official-artwork"].front_default,t.height=e.height,t.weight=e.weight,t.types=[],e.types.forEach(function(e){t.types.push(e.type.name)})}).catch(function(t){console.error(t),r()})}return{add:n,getAll:function(){return t},addListItem:function(t){let e=document.querySelector(".list-group"),n=document.createElement("button");n.innerText=t.name,n.classList.add("list-group-item"),n.classList.add("pokemonButtonStyle"),n.setAttribute("type","button"),n.classList.add("btn"),n.classList.add("btn-primary"),n.setAttribute("data-target","#pokemon-modal"),n.setAttribute("data-toggle","modal"),e.appendChild(n),n.addEventListener("click",function(){s(t)})},loadList:function(){return i(),fetch(e).then(function(t){return t.json()}).then(function(t){r(),t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){r(),console.error(t)})},loadDetails:a,showDetails:s}}();function searchPokemon(){document.querySelector("#searchForm").addEventListener("submit",function(t){searchPokemon(document.getElementById("pokemon-search")),t.preventDefault()},!1)}$(document).ready(function(){$("#pokemon-search").on("keyup",function(){let t=$(this).val().toLowerCase();$(".list-group-item").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(t)>-1)})})}),searchPokemon(),pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});