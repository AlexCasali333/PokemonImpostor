package pokehub.dto.shiny;

import java.util.List;

public class ShinyRoundDTO {
    private final int pokemonId;
    private final String pokemonName;
    private final List<ShinyOptionDTO> options;

    public ShinyRoundDTO(int pokemonId, String pokemonName, List<ShinyOptionDTO> options) {
        this.pokemonId = pokemonId;
        this.pokemonName = pokemonName;
        this.options = options;
    }

    // Getters
    public int getPokemonId() { return pokemonId; }
    public String getPokemonName() { return pokemonName; }
    public List<ShinyOptionDTO> getOptions() { return options; }
}