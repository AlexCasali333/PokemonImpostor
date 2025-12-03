package pokehub.controller;

import pokehub.model.Player;
import pokehub.service.GameService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GameController {

    private final GameService gameService;
    private List<Player> currentPlayers = new ArrayList<>();

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/impostor")
    public String impostorConfig() {
        return "impostor";
    }

    @GetMapping("/shiny")
    public String shinyConfig() {
        return "shiny";
    }

    @GetMapping("/roulette")
    public String showRoulette(Model model) {
        model.addAttribute("players", this.currentPlayers);
        return "roulette";
    }

    @PostMapping("/start")
    public String startGame(
            @RequestParam("playerNames") List<String> playerNames,
            @RequestParam(value = "generations", required = false) List<Integer> generations,
            Model model
    ) {
        if (generations == null || generations.isEmpty()) {
            generations = List.of(1);
        }
        List<Player> players = gameService.startGame(playerNames, generations);
        this.currentPlayers = players;

        model.addAttribute("players", players);
        return "game";
    }
}

