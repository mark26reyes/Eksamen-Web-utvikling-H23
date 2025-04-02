using Microsoft.EntityFrameworkCore;
using F1API.Models;

namespace F1API.Context
{
    public class F1Context : DbContext
    {
        public F1Context(DbContextOptions<F1Context> options) : base(options) { }

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Many-to-many: Drivers <-> Races (participation)
            modelBuilder.Entity<Driver>()
                .HasMany(d => d.Races)
                .WithMany(r => r.Drivers)
                .UsingEntity(j => j.ToTable("DriverRaces")); // optional join table name

            // One-to-many: Race has a Winner (Driver)
            modelBuilder.Entity<Race>()
                .HasOne(r => r.Winner)
                .WithMany()
                .HasForeignKey("WinnerId")
                .OnDelete(DeleteBehavior.Restrict); // Avoid cascade delete issues
        }
    }
}
