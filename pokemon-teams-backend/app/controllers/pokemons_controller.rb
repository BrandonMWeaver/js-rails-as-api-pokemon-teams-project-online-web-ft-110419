class PokemonsController < ApplicationController

	def create
		trainer = Trainer.find_by(id: params[:pokemon][:trainer_id])
		pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
		render json: PokemonSerializer.new(pokemon).to_serialized_json
	end
	
	def destroy
		pokemon = Pokemon.find_by(id: params[:id])
		pokemon.destroy
	end

end
