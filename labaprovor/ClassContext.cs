﻿using Microsoft.EntityFrameworkCore;

namespace labaprovor
{
    public class ClassContext : DbContext
    {
        public ClassContext(DbContextOptions dbContext) : base(dbContext)
        {
            //Database.EnsureCreated();
        }
       
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusImg> BusesImges { get; set; }
        public DbSet<BusParams> BusesParams { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Slider> Sliders { get; set; }

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
            modelBuilder
               .Entity<Bus>()
               .HasMany(pr => pr.Customers)
               .WithMany(u => u.Buses)
               .UsingEntity<UserBus>(
                    j => j.HasOne(ub => ub.User)
                        .WithMany()
                        .HasForeignKey(ub => ub.UserId),
                    j => j.HasOne(ub => ub.Bus)
                        .WithMany()
                        .HasForeignKey(ub => ub.BusId)
                );

            modelBuilder.Entity<UserBus>()
                .HasKey(ub => new { ub.UserId, ub.BusId });
        }

    }
}
