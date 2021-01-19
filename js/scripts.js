// list pokemon in array by name, type, weight, height

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // pushes pokemon to list

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
      return pokemonList;
  }

// functions for loading spinner when fetching data

let spinner = document.querySelector('#spinner');

  function showLoadingMessage() {
    spinner.removeAttribute('hidden');
  }

  function hideLoadingMessage() {
    spinner.setAttribute('hidden', '');
  }

  // shows poke details on console

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function  ()  {
      console.log(pokemon);
    });
  }

  // lists of pokemon with button

  function addListItem(pokemon)  {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButtonStyle');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    // console log when pokemon button is clicked -- event listener
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // fetches and loads the details for each pokemon through the apiURL

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  return  {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

// Adds the list of buttons for each pokemon

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon)  {
    pokemonRepository.addListItem(pokemon);
  });
});
