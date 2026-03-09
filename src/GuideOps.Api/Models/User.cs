namespace GuideOps.Api.Models;

public class User
{
    public int Id { get; set; }
    public string AzureAdObjectId { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "Student";
    public bool IsActive { get; set; } = true;
    public DateTime? LastSyncedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Acknowledgment> Acknowledgments { get; set; } = [];
    public ICollection<GuideCompletion> GuideCompletions { get; set; } = [];
}
