package pl.paweltroc.applauserecruitment.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.paweltroc.applauserecruitment.services.CountryCodeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CountryCodeController {

    private final CountryCodeService countryCodeService;

    @GetMapping("/countries")
    public List<String> getAllCountryCodes() {
        return countryCodeService.getAllCountryCodes();
    }
}
