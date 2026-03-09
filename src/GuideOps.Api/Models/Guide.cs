namespace GuideOps.Api.Models;

public class Guide
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Type { get; set; } = "Walkthrough"; // Walkthrough or Announcement
    public bool IsActive { get; set; } = true;
    public string SchoolYear { get; set; } = string.Empty;
    public int Priority { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = string.Empty;

    public ICollection<GuideStep> Steps { get; set; } = [];
    public ICollection<GuideCompletion> Completions { get; set; } = [];
    public ICollection<Assignment> Assignments { get; set; } = [];
}
