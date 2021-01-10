package pl.paweltroc.applauserecruitment.dtos;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.paweltroc.applauserecruitment.entities.Device;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DeviceDto {

    private Integer id;
    private String description;

    public DeviceDto(Device device) {
        this.id = device.getId();
        this.description = device.getDescription();
    }
}
