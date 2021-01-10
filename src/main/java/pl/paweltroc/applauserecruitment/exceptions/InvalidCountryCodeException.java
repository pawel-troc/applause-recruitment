package pl.paweltroc.applauserecruitment.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static java.lang.String.format;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidCountryCodeException extends RuntimeException {
    public InvalidCountryCodeException(String code) {
        super(format("Country code [%s] is invalid", code));
    }
}
