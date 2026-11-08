namespace Backend.Api.Validation.DataEndpoints;

public class LongUrlRequestValidator
{
    public static ValidationResult ValidateLongUrl(string shortUrlCode)
    {
        var validator = new InlineValidator<string>();

        validator.RuleFor(longUrl => longUrl)
            .NotEmpty()
                .WithMessage("A short url code is required")
            .NotNull()
                .WithMessage("A short url code is required")
            .MaximumLength(7)
                .WithMessage("A short url should have a maximum of 7 characters");

        return validator.Validate(shortUrlCode);
    }
}
