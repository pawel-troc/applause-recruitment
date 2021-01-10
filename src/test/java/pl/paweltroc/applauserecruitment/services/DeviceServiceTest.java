package pl.paweltroc.applauserecruitment.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.paweltroc.applauserecruitment.dtos.DeviceDto;
import pl.paweltroc.applauserecruitment.entities.Device;
import pl.paweltroc.applauserecruitment.repositories.DeviceRepository;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class DeviceServiceTest {

    @InjectMocks
    private DeviceService deviceService;

    @Mock
    private DeviceRepository deviceRepository;

    @Test
    void shouldReturnListOfDevices() {
        // given
        Mockito.when(deviceRepository.findAll()).thenReturn(Arrays.asList(
                new Device(1, "iPhone X"),
                new Device(2, "Xiaomi Mi6")
        ));

        // when
        List<DeviceDto> allDevices = deviceService.getAllDevices();

        // then
        assertThat(allDevices).containsExactly(
                new DeviceDto(1, "iPhone X"),
                new DeviceDto(2, "Xiaomi Mi6")
        );
    }
}