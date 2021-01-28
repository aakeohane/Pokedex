// Beginning of iife

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=898";


  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
      return pokemonList;
  }

// functions for loading spinner when fetching data

let spinner = document.querySelector('#spinner');

  function showLoadingSpinner() {
    spinner.removeAttribute('hidden');
  }

  function hideLoadingSpinner() {
    spinner.setAttribute('hidden', '');
  }

  // lists all the pokemon with a button

  function addListItem(pokemon)  {
    let pokemonList = document.querySelector(".list-group");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("list-group-item");
    button.classList.add("pokemonButtonStyle");
    button.setAttribute("type", "button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-target", "#pokemon-modal");
    button.setAttribute("data-toggle", "modal");
    pokemonList.appendChild(button);

    // shows modal when pokemon button is clicked -- event listener
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // opens modal with all the pokedetails

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function  ()  {
      showModal(pokemon);
    });
  }

// function for declaring a space and type to types: string
  function typeLength (pokemon) {
    return pokemon.types.length > 1
     ? 'Types: ' + pokemon.types.join(', ')
      : 'Type: ' + pokemon.types
  }

  function showModal(pokemon)  {

    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + pokemon.name + '</h1>');

    let pokeImage = $("<img class='modal-img' style='width:75%'>");
    pokeImage.attr('src', pokemon.imageUrl);

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height / 0.1 + ' cm' + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight / 10 + ' kg' + '</p>');

    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = typeLength(pokemon);

    modalTitle.append(pokeImage);
    modalBody.append(pokemonName);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);

  }

  // fetches and loads the details for each pokemon through the apiURL

  function loadList() {
    showLoadingSpinner();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingSpinner();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingSpinner();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingSpinner();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingSpinner();
      // Adds the details to the item from the api
      item.imageUrl = details.sprites.other["official-artwork"].front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
      })
    }).catch(function (e) {
      console.error(e);
      hideLoadingSpinner();
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
// End of IIFE

// Loads the list of buttons for each pokemon

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon)  {
    pokemonRepository.addListItem(pokemon);
  });
});
