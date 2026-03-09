namespace GuideOps.Api.Models;

public class GuideAssignment
{
    public int Id { get; set; }
    public int GuideId { get; set; }
    public string AssignToRole { get; set; } = "All";
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guide? Guide { get; set; }
}
