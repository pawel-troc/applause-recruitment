package pl.paweltroc.applauserecruitment.dtos;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Builder
@Getter
@EqualsAndHashCode
public class MatchedTesterDto {

    private final Integer id;
    private final String firstName;
    private final String lastName;
    private final Integer foundBugsQuantity;
}
