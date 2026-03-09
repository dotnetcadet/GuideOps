namespace GuideOps.Api.Models;

public class Handbook
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? ContentUrl { get; set; }
    public string? ContentHtml { get; set; }
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public bool RequiresAcknowledgment { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Acknowledgment> Acknowledgments { get; set; } = [];
    public ICollection<Assignment> Assignments { get; set; } = [];
}
