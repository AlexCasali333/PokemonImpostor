package es.alex.pokemonimpostor.controller;

import es.alex.pokemonimpostor.service.GameService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @PostMapping("/start")
    public String startGame(
            @RequestParam("playerNames") List<String> playerNames,
            @RequestParam(value = "generations", required = false) List<Integer> generations,
            Model model
    ) {
        if (generations == null || generations.isEmpty()) {
            generations = List.of(1); // Default gen 1 if none selected
        }

        model.addAttribute("players", gameService.startGame(playerNames, generations));
        return "game";
    }
}

