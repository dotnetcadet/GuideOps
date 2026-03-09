using GuideOps.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GuideOps.Api.Data;

public class GuideOpsDbContext(DbContextOptions<GuideOpsDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Guide> Guides => Set<Guide>();
    public DbSet<GuideStep> GuideSteps => Set<GuideStep>();
    public DbSet<Handbook> Handbooks => Set<Handbook>();
    public DbSet<Acknowledgment> Acknowledgments => Set<Acknowledgment>();
    public DbSet<GuideCompletion> GuideCompletions => Set<GuideCompletion>();
    public DbSet<Assignment> Assignments => Set<Assignment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.AzureAdObjectId).IsUnique();
            entity.HasIndex(e => e.Email);
            entity.Property(e => e.AzureAdObjectId).HasMaxLength(36);
            entity.Property(e => e.DisplayName).HasMaxLength(256);
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.Role).HasMaxLength(50);
        });

        // Guide
        modelBuilder.Entity<Guide>(entity =>
        {
            entity.Property(e => e.Title).HasMaxLength(256);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.Type).HasMaxLength(50);
            entity.Property(e => e.SchoolYear).HasMaxLength(9);
            entity.Property(e => e.CreatedBy).HasMaxLength(256);
        });

        // GuideStep
        modelBuilder.Entity<GuideStep>(entity =>
        {
            entity.HasIndex(e => new { e.GuideId, e.StepOrder });
            entity.Property(e => e.ElementSelector).HasMaxLength(500);
            entity.Property(e => e.Title).HasMaxLength(256);
            entity.Property(e => e.Description).HasMaxLength(2000);
            entity.Property(e => e.Side).HasMaxLength(20);
            entity.Property(e => e.PageUrl).HasMaxLength(500);

            entity.HasOne(e => e.Guide)
                .WithMany(g => g.Steps)
                .HasForeignKey(e => e.GuideId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Handbook
        modelBuilder.Entity<Handbook>(entity =>
        {
            entity.Property(e => e.Title).HasMaxLength(256);
            entity.Property(e => e.ContentUrl).HasMaxLength(1000);
            entity.Property(e => e.SchoolYear).HasMaxLength(9);
        });

        // Acknowledgment
        modelBuilder.Entity<Acknowledgment>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.HandbookId, e.SchoolYear }).IsUnique();
            entity.HasIndex(e => e.SchoolYear);
            entity.Property(e => e.SchoolYear).HasMaxLength(9);
            entity.Property(e => e.IpAddress).HasMaxLength(45);

            entity.HasOne(e => e.User)
                .WithMany(u => u.Acknowledgments)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Handbook)
                .WithMany(h => h.Acknowledgments)
                .HasForeignKey(e => e.HandbookId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // GuideCompletion
        modelBuilder.Entity<GuideCompletion>(entity =>
        {
            entity.HasIndex(e => new { e.UserId, e.GuideId }).IsUnique();

            entity.HasOne(e => e.User)
                .WithMany(u => u.GuideCompletions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Guide)
                .WithMany(g => g.Completions)
                .HasForeignKey(e => e.GuideId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Assignment (polymorphic)
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasIndex(e => new { e.TargetType, e.TargetId });
            entity.HasIndex(e => new { e.AssignToRole, e.SchoolYear });
            entity.Property(e => e.TargetType).HasMaxLength(50);
            entity.Property(e => e.AssignToRole).HasMaxLength(50);
            entity.Property(e => e.SchoolYear).HasMaxLength(9);

            // Conditional relationships for polymorphic design
            entity.HasOne(e => e.Guide)
                .WithMany(g => g.Assignments)
                .HasForeignKey(e => e.TargetId)
                .HasPrincipalKey(g => g.Id)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);

            entity.HasOne(e => e.Handbook)
                .WithMany(h => h.Assignments)
                .HasForeignKey(e => e.TargetId)
                .HasPrincipalKey(h => h.Id)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);
        });

        // Seed test users
        var now = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<User>().HasData(
            // Teachers
            new User { Id = 1, AzureAdObjectId = "00000000-0000-0000-0000-000000000001", DisplayName = "Sarah Johnson", Email = "sjohnson@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 2, AzureAdObjectId = "00000000-0000-0000-0000-000000000002", DisplayName = "Michael Chen", Email = "mchen@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 3, AzureAdObjectId = "00000000-0000-0000-0000-000000000003", DisplayName = "Rachel Williams", Email = "rwilliams@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 4, AzureAdObjectId = "00000000-0000-0000-0000-000000000004", DisplayName = "David Martinez", Email = "dmartinez@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 5, AzureAdObjectId = "00000000-0000-0000-0000-000000000005", DisplayName = "Lisa Thompson", Email = "lthompson@edio.school", Role = "Teacher", IsActive = true, CreatedAt = now, UpdatedAt = now },
            // Students
            new User { Id = 6, AzureAdObjectId = "00000000-0000-0000-0000-000000000006", DisplayName = "Emma Davis", Email = "edavis@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 7, AzureAdObjectId = "00000000-0000-0000-0000-000000000007", DisplayName = "James Wilson", Email = "jwilson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 8, AzureAdObjectId = "00000000-0000-0000-0000-000000000008", DisplayName = "Sophia Garcia", Email = "sgarcia@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 9, AzureAdObjectId = "00000000-0000-0000-0000-000000000009", DisplayName = "Ethan Brown", Email = "ebrown@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 10, AzureAdObjectId = "00000000-0000-0000-0000-000000000010", DisplayName = "Olivia Anderson", Email = "oanderson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 11, AzureAdObjectId = "00000000-0000-0000-0000-000000000011", DisplayName = "Noah Taylor", Email = "ntaylor@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 12, AzureAdObjectId = "00000000-0000-0000-0000-000000000012", DisplayName = "Ava Thomas", Email = "athomas@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 13, AzureAdObjectId = "00000000-0000-0000-0000-000000000013", DisplayName = "Liam Jackson", Email = "ljackson@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 14, AzureAdObjectId = "00000000-0000-0000-0000-000000000014", DisplayName = "Isabella White", Email = "iwhite@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            new User { Id = 15, AzureAdObjectId = "00000000-0000-0000-0000-000000000015", DisplayName = "Mason Harris", Email = "mharris@edio.school", Role = "Student", IsActive = true, CreatedAt = now, UpdatedAt = now },
            // Admin
            new User { Id = 16, AzureAdObjectId = "00000000-0000-0000-0000-000000000016", DisplayName = "Admin User", Email = "admin@edio.school", Role = "Admin", IsActive = true, CreatedAt = now, UpdatedAt = now }
        );
    }
}
