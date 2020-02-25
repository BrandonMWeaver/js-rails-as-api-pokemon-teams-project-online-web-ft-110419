const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL).then(function(response) {
	return response.json();
}).then(function(json) {
	console.log(json);
	for (let i = 0; i < json.length; i++) {
		console.log(json[i].name);
		const div = document.createElement("div");
		const p = document.createElement("p");
		const btn = document.createElement("button");
		const ul = document.createElement("ul");
		div.className = "card";
		div.setAttribute("data-id", json[i].id);
		p.innerHTML = json[i].name;
		div.append(p);
		btn.setAttribute("data-trainer-id", json[i].id);
		btn.innerHTML = "Add Pokemon"
		btn.style.cursor = "pointer";
		btn.addEventListener("click", function(event) {
			fetch(POKEMONS_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({ "trainer_id": event.target.dataset.trainerId })
			}).then(function(resp) {
				return resp.json();
			}).then(function(poke) {
				generatePokemon(ul, poke);
			});
		});
		div.append(btn);
		div.append(ul);
		for (const pokemon of json[i].pokemons) {
			generatePokemon(ul, pokemon);
		}

		document.querySelector("main").append(div);
	}
}).catch(function(error) {
	console.log(error.message);
});

function generatePokemon(ul, pokemon) {
	const li = document.createElement("li");
	const releaseBtn = document.createElement("button");
	li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `;
	releaseBtn.className = "release";
	releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
	releaseBtn.innerHTML = "Release";
	releaseBtn.style.cursor = "pointer";
	releaseBtn.addEventListener("click", function(event) {
		fetch(`${POKEMONS_URL}/${pokemon.id}`, {
			method: "DELETE"
		}).then(function() {
			event.target.parentElement.remove();
		});
	});
	li.append(releaseBtn);
	ul.append(li);
}
