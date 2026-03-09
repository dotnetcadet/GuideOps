namespace GuideOps.Api.Models;

public class GuideCompletion
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int GuideId { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Guide Guide { get; set; } = null!;
}
