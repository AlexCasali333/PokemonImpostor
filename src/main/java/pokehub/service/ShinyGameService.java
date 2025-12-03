package pokehub.service;

import pokehub.dto.shiny.ShinyOptionDTO;
import pokehub.dto.shiny.ShinyRoundDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class ShinyGameService {

    private final Random random = new Random();
    private final int MAX_POKEMON = 1025;
    private final String BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

    public ShinyRoundDTO generateRound() {
        int id = random.nextInt(MAX_POKEMON) + 1;

        String shinyUrl = BASE_URL + "/shiny/" + id + ".png";
        String normalUrl = BASE_URL + "/" + id + ".png";

        List<String> filters = new ArrayList<>(List.of(
                "fake-a", "fake-b", "fake-c", "fake-d", "fake-e", "fake-f"
        ));
        Collections.shuffle(filters);

        List<ShinyOptionDTO> options = new ArrayList<>();
        options.add(new ShinyOptionDTO(shinyUrl, true, ""));

        for (int i = 0; i < 3; i++) {
            options.add(new ShinyOptionDTO(normalUrl, false, filters.get(i)));
        }

        Collections.shuffle(options);

        // Nota: El nombre lo dejamos como "Pokemon #{id}" por ahora para no ralentizar llamando a PokeAPI.
        // Si quieres el nombre real, tendríamos que llamar a la API de PokeAPI aquí mismo.
        String name = "Pokémon #" + id;

        return new ShinyRoundDTO(id, name, options);
    }
}