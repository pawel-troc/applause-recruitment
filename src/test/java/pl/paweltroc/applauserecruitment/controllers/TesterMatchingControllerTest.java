package pl.paweltroc.applauserecruitment.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.paweltroc.applauserecruitment.dtos.MatchedTesterDto;
import pl.paweltroc.applauserecruitment.exceptions.InvalidCountryCodeException;
import pl.paweltroc.applauserecruitment.services.TesterMatchingService;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TesterMatchingControllerTest {

    @Mock
    private TesterMatchingService testerMatchingService;
    @InjectMocks
    private TesterMatchingController testerMatchingController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(testerMatchingController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldReturnArrayOfJsonObjects() throws Exception {
        // given
        List<MatchedTesterDto> testers = asList(
                MatchedTesterDto.builder().id(1).foundBugsQuantity(1).build(),
                MatchedTesterDto.builder().id(2).foundBugsQuantity(2).build()
        );
        when(testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(asList(1, 2), asList("UK", "PL")))
                .thenReturn(testers);

        // when
        mockMvc.perform(get("/testers?devices=1,2&countryCodes=UK,PL"))

                // then
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(testers)));
    }

    @Test
    void shouldReturnEmptyArrayWhenNoTestersFound() throws Exception {
        // given
        when(testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(asList(1, 2), asList("UK", "PL")))
                .thenReturn(emptyList());

        // when
        mockMvc.perform(get("/testers?devices=1,2&countryCodes=UK,PL"))

                // then
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(emptyList())));
    }

    @Test
    void shouldReturn400WhenDevicesParamMissing() throws Exception {
        // when
        mockMvc.perform(get("/testers?countryCodes=UK"))

                // then
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void shouldReturn400WhenCountryCodesParamMissing() throws Exception {
        // when
        mockMvc.perform(get("/testers?devices=1"))

                // then
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void shouldReturn400WhenInvalidCountryCodeExceptionOccurs() throws Exception {
        // given
        when(testerMatchingService.matchTestersByDeviceIdsAndCountryCodes(any(), any()))
                .thenThrow(InvalidCountryCodeException.class);

        // when
        mockMvc.perform(get("/testers?devices=1&countryCodes=abc"))
                .andExpect(status().isBadRequest());
    }
}
