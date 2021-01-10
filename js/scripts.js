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
    type: ['fire', 'normal'],
    weight: 25,
    height: 0.9
  }
];

//  Lists pokemon by name and their height and if statement declares that they are tall

for (let i = 0; i < pokemonList.length; i++)   {
    if (pokemonList[i].height > 0.9){
      document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Dang! She tall!</p>');
    }

    else{
      document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');
    }
}
