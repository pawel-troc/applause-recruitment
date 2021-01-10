package pl.paweltroc.applauserecruitment.controllers;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.paweltroc.applauserecruitment.services.CountryCodeService;

import static java.util.Arrays.asList;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class CountryCodeControllerTest {

    @Mock
    private CountryCodeService countryCodeService;

    @InjectMocks
    private CountryCodeController countryCodeController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(countryCodeController).build();
    }

    @Test
    void shouldReturnJsonArrayOfCountryCodes() throws Exception {
        // given
        Mockito.when(countryCodeService.getAllCountryCodes()).thenReturn(asList("UK", "PL"));

        // when
        mockMvc.perform(MockMvcRequestBuilders.get("/countries"))

                // then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", Matchers.containsInAnyOrder("UK", "PL")));
    }
}