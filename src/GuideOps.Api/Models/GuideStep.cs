namespace GuideOps.Api.Models;

public class GuideStep
{
    public int Id { get; set; }
    public int GuideId { get; set; }
    public int StepOrder { get; set; }
    public string ElementSelector { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Side { get; set; } = "bottom"; // top, bottom, left, right
    public string? PageUrl { get; set; }

    public Guide Guide { get; set; } = null!;
}
