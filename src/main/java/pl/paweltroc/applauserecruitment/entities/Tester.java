package pl.paweltroc.applauserecruitment.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Tester")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Tester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "country_code", nullable = false)
    private String countryCode;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "tester")
    private List<Bug> bugsFound;

    @ManyToMany
    @JoinTable(
            name = "Tester_Device",
            joinColumns = @JoinColumn(name = "tester_id"),
            inverseJoinColumns = @JoinColumn(name = "device_id")
    )
    private List<Device> devices;
}
