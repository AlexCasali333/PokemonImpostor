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
            Model model
    ) {
        model.addAttribute("players", gameService.startGame(playerNames));
        return "game";
    }
}

