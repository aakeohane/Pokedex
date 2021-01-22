// Beginning of iife

let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
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

  // opens modal with all the pokedetails

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function  ()  {
      showModal(pokemon);
    });
  }



  function showModal(pokemon)  {
    modalContainer.classList.add('is-visible');

  // Clear all existing modal content
    modalContainer.innerHTML = '';

  // Add the new modal content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // closes the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;


    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = 'Type: ' + pokemon.types;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    let imgContainer = document.querySelector('#poke-image');
    let pokeImage = document.createElement('img');
    pokeImage.src = pokemon.imageUrl;


    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonTypes);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokeImage);
    modalContainer.appendChild(modal);
  }

  // lists all the pokemon with a button

  function addListItem(pokemon)  {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButtonStyle');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    // shows modal when pokemon button is clicked -- event listener
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
      // Adds the details to the item from the api
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
      })
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

// closes modal Container
window.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
     hideModal();
   }
 });

 modalContainer.addEventListener('click', (e) => {
   // Since this is also triggered when clicking INSIDE the modal
   // We only want to close if the user clicks directly on the overlay
   let target = e.target;
   if (target === modalContainer) {
     hideModal();
   }
 });

 // close modal function

 function hideModal()  {
   let modalContainer = document.querySelector('#modal-container');
   modalContainer.classList.remove('is-visible');
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
