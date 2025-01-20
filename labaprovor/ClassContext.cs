using Microsoft.EntityFrameworkCore;

namespace labaprovor
{
    public class ClassContext : DbContext
    {
        public ClassContext(DbContextOptions dbContext) : base(dbContext)
        {
            Database.EnsureCreated();
        }
       

        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusImg> BusesImges { get; set; }
        public DbSet<BusParams> BusesParams { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Bus>()
                .HasOne(pi => pi.Params)
                .WithOne(pr => pr.Bus)
                .HasForeignKey<BusParams>(pr => pr.BusId);

            modelBuilder
                .Entity<Bus>()
                .HasOne(pi => pi.Image)
                .WithOne(pr => pr.Bus)
                .HasForeignKey<BusImg>(pr => pr.BusId);

            modelBuilder
               .Entity<Bus>()
               .HasMany(pr => pr.Customers)
               .WithMany(u => u.Buses);
        }

    }
}
