package pl.paweltroc.applauserecruitment.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.paweltroc.applauserecruitment.repositories.TesterRepository;

import java.util.List;

import static java.util.stream.Collectors.toUnmodifiableList;

@Service
@RequiredArgsConstructor
public class CountryCodeService {

    private final TesterRepository testerRepository;

    public List<String> getAllCountryCodes() {
        return testerRepository
                .getCountryCodesFromTesters()
                .stream()
                .map(String::toUpperCase)
                .collect(toUnmodifiableList());
    }
}
