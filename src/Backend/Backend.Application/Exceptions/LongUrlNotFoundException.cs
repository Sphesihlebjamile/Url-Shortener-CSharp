namespace Backend.Application.Exceptions;

public class LongUrlNotFoundException : ApplicationBaseException
{
    /// <summary>
    /// Initializes a new instance of the <see cref="LongUrlNotFoundException"/> class with a specified error message 🦆
    /// </summary>
    /// <param name="message">The error message.</param>
    public LongUrlNotFoundException(string message)
        : base("Long Url Not Found", message, 404) // Default status code to 404 (Not Found)
    {
    }
}
