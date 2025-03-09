
async function searchPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');

    if (!pokemonInput) {
        resultDiv.innerHTML = '<p class="error">Please enter a Pokémon name or ID.</p>';
        return;
    } // to make sure that there is some form of user input in order to run 

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        } // in case they mistyped the name or otherwise didn't enter a correct Pokemon name/id

        const data = await response.json();
        const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const pokemonImage = data.sprites.front_default;
        const pokemonShiny = data.sprites.front_shiny;  // I wanted to show shiny sprites too 
        const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)).join(', ');

        resultDiv.innerHTML = `
            <h2>${pokemonName}</h2>
            <img src="${pokemonImage}" alt="${pokemonName}" />
            <img src="${pokemonShiny}" alt="Shiny ${pokemonName}" />
            <p><strong>Type:</strong> ${pokemonTypes}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Pokémon not found. Please try again.</p>';
    } // this'll show an error if the pokemon/input wasn't found, and it'll be styled using the error class in the CSS file.
}