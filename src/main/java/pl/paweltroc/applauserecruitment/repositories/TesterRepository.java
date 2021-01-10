package pl.paweltroc.applauserecruitment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.paweltroc.applauserecruitment.entities.Tester;

import java.util.List;

@Repository
public interface TesterRepository extends JpaRepository<Tester, Integer> {

    List<Tester> findDistinctByDevicesIdInAndCountryCodeIn(List<Integer> deviceIds, List<String> countryCodes);

    @Query("select distinct countryCode from Tester")
    List<String> getCountryCodesFromTesters();
}
