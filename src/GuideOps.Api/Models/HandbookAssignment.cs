namespace GuideOps.Api.Models;

public class HandbookAssignment
{
    public int Id { get; set; }
    public int HandbookId { get; set; }
    public string AssignToRole { get; set; } = "All";
    public string SchoolYear { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Handbook? Handbook { get; set; }
}
