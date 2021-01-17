let pokemonRepository = (function () {
  let repository = [
    {
      name: 'Vaporeon',
      type: ['water', 'ice'],
      weight: 29,
      height: 1
    },
    {
      name: 'Jolteon',
      type: ['electric', 'bug'],
      weight: 24.5,
      height: 0.8
    },
    {
      name: 'Flareon',
      type: ['fire', 'fox'],
      weight: 25,
      height: 0.9
    }
  ];

  function add(pokemon) {
      repository.push(pokemon);
  }

  function getAll() {
      return repository;
  }

  function addListItem(pokemon)  {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButtonStyle');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  return  {
      add: add,
      getAll: getAll,
      addListItem: addListItem
  };
  })();

// Adds a list of buttons for each pokemon

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
