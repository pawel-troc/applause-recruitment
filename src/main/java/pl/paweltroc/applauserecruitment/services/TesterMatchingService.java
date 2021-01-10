package pl.paweltroc.applauserecruitment.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.paweltroc.applauserecruitment.dtos.MatchedTesterDto;
import pl.paweltroc.applauserecruitment.exceptions.InvalidCountryCodeException;
import pl.paweltroc.applauserecruitment.repositories.TesterRepository;

import java.util.List;
import java.util.regex.Pattern;

import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.toUnmodifiableList;

@Service
@RequiredArgsConstructor
public class TesterMatchingService {

    private static final Pattern COUNTRY_CODE_REGEX = Pattern.compile("^[a-zA-Z]{2}$", Pattern.CASE_INSENSITIVE);

    private final TesterRepository testerRepository;

    @Transactional
    public List<MatchedTesterDto> matchTestersByDeviceIdsAndCountryCodes(
            List<Integer> deviceIds,
            List<String> countryCodes
    ) {
        countryCodes.forEach(code -> {
            if (!COUNTRY_CODE_REGEX.matcher(code).matches()) {
                throw new InvalidCountryCodeException(code);
            }
        });

        List<String> countryCodeSet = countryCodes
                .stream()
                .distinct()
                .map(String::toUpperCase)
                .collect(toUnmodifiableList());

        return testerRepository.findDistinctByDevicesIdInAndCountryCodeIn(deviceIds, countryCodeSet)
                .stream()
                .map(tester -> MatchedTesterDto
                        .builder()
                        .id(tester.getId())
                        .firstName(tester.getFirstName())
                        .lastName(tester.getLastName())
                        .foundBugsQuantity(tester
                                .getBugsFound()
                                .stream()
                                .filter(bug -> deviceIds.contains(bug.getDevice().getId()))
                                .mapToInt(bug -> 1)
                                .sum()
                        )
                        .build()
                )
                .sorted(comparingInt(MatchedTesterDto::getFoundBugsQuantity).reversed())
                .collect(toUnmodifiableList());
    }
}
