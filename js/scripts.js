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

for (let i = 0; i < pokemonList.length; i++){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');
}
