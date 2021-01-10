package pl.paweltroc.applauserecruitment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.paweltroc.applauserecruitment.entities.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Integer> {
}
