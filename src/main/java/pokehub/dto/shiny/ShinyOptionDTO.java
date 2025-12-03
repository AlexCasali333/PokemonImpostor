package pokehub.dto.shiny;

public class ShinyOptionDTO {
    private final String imageUrl;
    private final boolean isShiny;
    private final String filterClass; // "fake-a", "fake-b", etc.

    public ShinyOptionDTO(String imageUrl, boolean isShiny, String filterClass) {
        this.imageUrl = imageUrl;
        this.isShiny = isShiny;
        this.filterClass = filterClass;
    }

    public String getImageUrl() { return imageUrl; }
    public boolean getIsShiny() { return isShiny; }
    public String getFilterClass() { return filterClass; }
}