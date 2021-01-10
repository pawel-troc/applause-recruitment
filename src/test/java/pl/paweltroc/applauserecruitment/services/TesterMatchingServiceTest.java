package pl.paweltroc.applauserecruitment.services;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.paweltroc.applauserecruitment.dtos.MatchedTesterDto;
import pl.paweltroc.applauserecruitment.entities.Bug;
import pl.paweltroc.applauserecruitment.entities.Device;
import pl.paweltroc.applauserecruitment.entities.Tester;
import pl.paweltroc.applauserecruitment.exceptions.InvalidCountryCodeException;
import pl.paweltroc.applauserecruitment.repositories.TesterRepository;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TesterMatchingServiceTest {

    @Mock
    private TesterRepository testerRepository;

    @InjectMocks
    private TesterMatchingService testerMatchingService;

    @Captor
    private ArgumentCaptor<List<String>> countryCodesCaptor;

    @Test
    void shouldThrowExceptionWhenInvalidCountryCode() {
        // given
        List<Integer> deviceIds = asList(1);
        List<String> countryCodes = asList("uk", "abc");

        // when
        Assertions.assertThatThrownBy(() -> testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(
                deviceIds,
                countryCodes
        ))
                // then
                .isInstanceOf(InvalidCountryCodeException.class);
    }

    @Test
    void shouldTransformCountryCodeToUpperCase() {
        // given
        List<Integer> deviceIds = asList(1);
        List<String> countryCodes = asList("uk", "pl");

        // when
        testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(deviceIds, countryCodes);

        // then
        verify(testerRepository, times(1)).findDistinctByDevicesIdInAndCountryCodeIn(any(), countryCodesCaptor.capture());
        assertThat(countryCodesCaptor.getValue()).containsExactlyInAnyOrder("UK", "PL");
    }

    @Test
    void shouldReturnEmptyListWhenNoTestersFound() {
        // given
        List<Integer> deviceIds = asList(1);
        List<String> countryCodes = asList("uk", "pl");
        when(testerRepository.findDistinctByDevicesIdInAndCountryCodeIn(any(), any())).thenReturn(emptyList());

        // when
        List<MatchedTesterDto> matchedTesterDtos = testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(deviceIds, countryCodes);

        // then
        Assertions.assertThat(matchedTesterDtos).isEmpty();
    }

    @Test
    void shouldReturnListOfMatchedTestersSortedDecrementallyByAmountOfBugsFound() {
        // given
        List<Integer> deviceIds = asList(1, 2);
        List<String> countryCodes = asList("uk", "pl");

        Device device1 = new Device(1, "iPhone X");
        Device device2 = new Device(2, "Xiaomi Mi6");
        Device device3 = new Device(3, "Samsung Galaxy S20");

        Tester tester1 = spy(Tester.builder().id(1).build());
        Tester tester2 = spy(Tester.builder().id(2).build());

        List<Bug> bugs1 = asList(
                new Bug(1, tester1, device1),
                new Bug(2, tester1, device1),
                new Bug(3, tester1, device3),
                new Bug(4, tester1, device3)
        );
        List<Bug> bugs2 = asList(
                new Bug(5, tester2, device1),
                new Bug(6, tester2, device2),
                new Bug(7, tester2, device2)
        );

        when(tester1.getBugsFound()).thenReturn(bugs1);
        when(tester2.getBugsFound()).thenReturn(bugs2);

        when(testerRepository.findDistinctByDevicesIdInAndCountryCodeIn(any(), any())).thenReturn(asList(tester1, tester2));

        // when
        List<MatchedTesterDto> matchedTesterDtos = testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(deviceIds, countryCodes);

        // then
        Assertions.assertThat(matchedTesterDtos).containsExactly(
            MatchedTesterDto.builder().id(2).foundBugsQuantity(3).build(),
            MatchedTesterDto.builder().id(1).foundBugsQuantity(2).build()
        );
    }
}