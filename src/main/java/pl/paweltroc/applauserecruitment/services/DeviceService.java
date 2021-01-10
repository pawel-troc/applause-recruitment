package pl.paweltroc.applauserecruitment.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.paweltroc.applauserecruitment.dtos.DeviceDto;
import pl.paweltroc.applauserecruitment.repositories.DeviceRepository;

import java.util.List;

import static java.util.stream.Collectors.toUnmodifiableList;

@Service
@RequiredArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public List<DeviceDto> getAllDevices() {
        return deviceRepository
                .findAll()
                .stream()
                .map(DeviceDto::new)
                .collect(toUnmodifiableList());
    }
}
