namespace GuideOps.Api.Models;

public class Acknowledgment
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int HandbookId { get; set; }
    public string SchoolYear { get; set; } = string.Empty;
    public DateTime AcknowledgedAt { get; set; } = DateTime.UtcNow;
    public string? IpAddress { get; set; }

    public User User { get; set; } = null!;
    public Handbook Handbook { get; set; } = null!;
}
