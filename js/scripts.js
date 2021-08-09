/* global $:readonly */
// Beginning of IIFE

let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';


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
    let pokemonList = document.querySelector('.list-group');
    let button = document.createElement('button');

    // let pokeSprite = $('<img style=\'width:75%\'/>');
    // pokeSprite.attr('src', pokemon.sprite);
    // console.log(pokeSprite)
  

    button.innerText = pokemon.name;
    button.classList.add('list-group-item');
    button.classList.add('pokemonButtonStyle');
    button.setAttribute('type', 'button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-target', '#pokemon-modal');
    button.setAttribute('data-toggle', 'modal');
    pokemonList.appendChild(button);
    // button.append(pokeSprite)

    // shows modal when pokemon button is clicked -- event listener
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // opens modal with all the pokedetails
  function showDetails(pokemon) {
    showLoadingSpinner();
    loadDetails(pokemon).then(function  ()  {
      showModal(pokemon);
      hideLoadingSpinner();
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

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + pokemon.name + '  #' + pokemon.id + '</h1>');

    let pokeImage = $('<img class=\'modal-img\' style=\'width:75%\'>');
    pokeImage.attr('src', pokemon.imageUrl);

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height / 0.1 + ' cm' + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight / 10 + ' kg' + '</p>');

    let pokemonTypes = $('<p>' + typeLength(pokemon) + '</p>');

    modalBody.append(pokeImage);
    modalTitle.append(pokemonName);
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
      // loads all pokemon
      json.results.forEach(function (item) {

      // filters results to just 6 random pokemon
      // let randomPoke = json.results.sort(() => 0.5 - Math.random());
      // randomPoke.slice(0, 6).map((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoadingSpinner();
      });
    }).catch(function (e) {
      hideLoadingSpinner();
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Adds the details to the item from the api
      item.id = details.id;
      item.sprite = details.sprites.front_default;
      item.imageUrl = details.sprites.other['official-artwork'].front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function (pokeType) {
          item.types.push(pokeType.type.name);
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

// jQuery search function (w3 method and MUCH faster)
$(document).ready(function()  {
  $('#pokemon-search').on('keyup', function() {
    let name = $(this).val().toLowerCase();
    $('.list-group-item').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(name) > -1);
    });
  });
  // the 'search' event allows the list to reload when you click the 'x' delete button (chrome) in the search bar
  $('#pokemon-search').on('search', function() {
    let name = $(this).val().toLowerCase();
    $('.list-group-item').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(name) > -1);
    });
  });
  // Listens for enter button and returns false so page doesnt reload on enter
  $('#pokemon-search').on('keydown', function(e) {
      if (e.keyCode == 13) {
          return false;
      }
  });
});

// vanilla Javascript search function

// function searchPokemon() {
//     let input = document.querySelector('#pokemon-search').value;
//     let filter = input.toUpperCase();
//     let searchNames = document.querySelectorAll('.list-group-item');
//     for (let i = 0; i < searchNames.length; i++) {
//
//         let txtValue = searchNames[i].innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             searchNames[i].style.display = '';
//         } else {
//             searchNames[i].style.display = 'none';
//         }
//     }
// }

// Loads the list of buttons for each pokemon
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon)  {
    pokemonRepository.addListItem(pokemon);
  });
});
