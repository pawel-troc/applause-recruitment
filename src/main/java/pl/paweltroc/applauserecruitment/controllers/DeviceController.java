package pl.paweltroc.applauserecruitment.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.paweltroc.applauserecruitment.dtos.DeviceDto;
import pl.paweltroc.applauserecruitment.services.DeviceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping("/devices")
    public List<DeviceDto> getAllDevices() {
        return deviceService.getAllDevices();
    }
}
