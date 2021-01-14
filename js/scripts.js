let pokemonRepository = (function () {
  let pokemonList = [
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
      pokemonList.push(pokemon);
  }

  function getAll() {
      return pokemonList;
  }

  return {
      add: add,
      getAll: getAll
  };
  })();


//  Lists pokemon by name and their height and if statement declares that they are tall

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height >= 1){
      document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Dang! She tall!</p>');
    }

    else{
      document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')</p>');
    }
});
