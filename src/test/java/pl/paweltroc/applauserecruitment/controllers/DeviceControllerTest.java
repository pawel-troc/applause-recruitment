package pl.paweltroc.applauserecruitment.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.paweltroc.applauserecruitment.dtos.DeviceDto;
import pl.paweltroc.applauserecruitment.services.DeviceService;

import java.util.List;

import static java.util.Arrays.asList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class DeviceControllerTest {

    @Mock
    private DeviceService deviceService;

    @InjectMocks
    private DeviceController deviceController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(deviceController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldReturnArrayOfJsonObjects() throws Exception {
        // given
        List<DeviceDto> devices = asList(
                new DeviceDto(1, "iPhone X"),
                new DeviceDto(2, "Xiaomi Mi6")
        );
        when(deviceService.getAllDevices()).thenReturn(devices);

        // when
        mockMvc.perform(MockMvcRequestBuilders.get("/devices"))

                // then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(content().json(objectMapper.writeValueAsString(devices)));
    }
}