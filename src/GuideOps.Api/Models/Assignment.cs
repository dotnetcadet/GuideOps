namespace GuideOps.Api.Models;

public class Assignment
{
    public int Id { get; set; }
    public string TargetType { get; set; } = string.Empty; // "Guide" or "Handbook"
    public int TargetId { get; set; }
    public string AssignToRole { get; set; } = "All"; // Student, Teacher, or All
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guide? Guide { get; set; }
    public Handbook? Handbook { get; set; }
}
