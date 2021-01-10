package pl.paweltroc.applauserecruitment.services;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.paweltroc.applauserecruitment.repositories.TesterRepository;

import java.util.List;

import static java.util.Arrays.asList;

@ExtendWith(MockitoExtension.class)
class CountryCodeServiceTest {

    @Mock
    private TesterRepository testerRepository;

    @InjectMocks
    private CountryCodeService countryCodeService;

    @Test
    void shouldReturnListOfAllCodesInUpperCase() {
        // given
        Mockito.when(testerRepository.getCountryCodesFromTesters()).thenReturn(asList(
                "uk",
                "pl",
                "jp"
        ));

        // when
        List<String> allCountryCodes = countryCodeService.getAllCountryCodes();

        // then
        Assertions.assertThat(allCountryCodes).containsExactly("UK", "PL", "JP");
    }
}