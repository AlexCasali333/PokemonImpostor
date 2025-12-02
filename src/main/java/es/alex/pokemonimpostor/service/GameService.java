package es.alex.pokemonimpostor.service;

import es.alex.pokemonimpostor.model.Player;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class GameService {

    public List<Player> startGame(List<String> playerNames) {
        List<Player> playerList = new ArrayList<>();
        String secretWord = getRandomPokemon(loadPokemonList());
        int impostorIndex = new Random().nextInt(playerNames.size());

        // We assign roles and secret words to players
        for (int i = 0; i < playerNames.size(); i++) {
            String role = (i == impostorIndex) ? "Impostor" : "Player";
            String assignedWord = (i == impostorIndex) ? null : secretWord;
            playerList.add(new Player(playerNames.get(i), role, assignedWord));
        }

        return playerList;
    }

    private static List<String> loadPokemonList() {
        InputStream stream = GameService.class.getClassLoader().getResourceAsStream("pokemon.txt");
        if (stream == null) {
            throw new RuntimeException("Resource pokemon.txt not found");
        }

        return new BufferedReader(new InputStreamReader(stream))
                .lines()
                .filter(line -> !line.isBlank())
                .collect(Collectors.toList());
    }

    private static String getRandomPokemon(List<String> pokemons) {
        Random randomGenerator = new Random();
        int randomIndex = randomGenerator.nextInt(pokemons.size());
        return pokemons.get(randomIndex);
    }
}
