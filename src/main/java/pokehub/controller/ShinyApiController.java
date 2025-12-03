package pokehub.controller;

import pokehub.dto.shiny.ShinyRoundDTO;
import pokehub.service.ShinyGameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shiny")
public class ShinyApiController {

    private final ShinyGameService shinyService;

    public ShinyApiController(ShinyGameService shinyService) {
        this.shinyService = shinyService;
    }

    @GetMapping("/round")
    public ShinyRoundDTO getNewRound() {
        return shinyService.generateRound();
    }
}