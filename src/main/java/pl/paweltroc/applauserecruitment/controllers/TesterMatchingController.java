package pl.paweltroc.applauserecruitment.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.paweltroc.applauserecruitment.dtos.MatchedTesterDto;
import pl.paweltroc.applauserecruitment.services.TesterMatchingService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TesterMatchingController {

    private final TesterMatchingService testerMatchingService;

    @GetMapping("testers")
    public List<MatchedTesterDto> matchTestersByDevicesAndCountryCodes(
            @RequestParam("deviceIds") List<Integer> deviceIds,
            @RequestParam("countryCodes") List<String> countryCodes
    ) {
        return testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(deviceIds, countryCodes);
    }
}
