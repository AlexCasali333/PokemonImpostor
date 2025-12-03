package pokehub.service;

import pokehub.model.Player;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {

    public List<Player> startGame(List<String> playerNames, List<Integer> generations) {
        List<String> availablePokemons = loadPokemonList(generations);
        String secretWord = getRandomPokemon(availablePokemons);

        List<Player> playerList = new ArrayList<>();
        int impostorIndex = new Random().nextInt(playerNames.size());

        // We assign roles and secret words to players
        for (int i = 0; i < playerNames.size(); i++) {
            String role = (i == impostorIndex) ? "Impostor" : "Player";
            String assignedWord = (i == impostorIndex) ? null : secretWord;
            playerList.add(new Player(playerNames.get(i), role, assignedWord));
        }

        return playerList;
    }

    private List<String> loadPokemonList(List<Integer> generations) {
        List<String> combinedList = new ArrayList<>();

        for (Integer gen : generations) {
            String filename = "data/gen" + gen + ".txt";
            InputStream stream = getClass().getClassLoader().getResourceAsStream(filename);

            if (stream != null) {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
                    List<String> genList = reader.lines()
                            .filter(line -> !line.isBlank())
                            .map(String::trim)
                            .toList();
                    combinedList.addAll(genList);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                System.out.println("Warning: File " + filename + " not found. Skipping.");
            }
        }
        return combinedList;
    }

    private static String getRandomPokemon(List<String> pokemons) {
        Random randomGenerator = new Random();
        int randomIndex = randomGenerator.nextInt(pokemons.size());
        return pokemons.get(randomIndex);
    }
}
