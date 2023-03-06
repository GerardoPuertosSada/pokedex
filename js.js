const Pokedex = document.getElementById("Pokedex");

console.log(Pokedex);

const fetchPokemon = () => {

  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => {return res.json();}));
  }
  Promise.all(promises).then (results => {
    const pokemon = results.map(data => ({ 
      name: data.name,
          id: data.id,
          image: data.sprites["front_default"],
          type: data.types.map((type) => type.type.name).join(", "),
        }));
        displayPokemon(pokemon);
});
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
      <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
      <p class="card-subtitle">Type: ${pokeman.type}</p>
  </li>
  `)
    .join("");
  Pokedex.innerHTML = pokemonHTMLString;
}


fetchPokemon();
