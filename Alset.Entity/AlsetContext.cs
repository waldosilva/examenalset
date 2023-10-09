using Alset.Entity.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Alset.Entity
{
    public class AlsetContext : DbContext
    {
        public AlsetContext(DbContextOptions<AlsetContext> options) : base(options)
        {
        }

        public DbSet<Journal> Journals { get; set; }
        public DbSet<Journalist> Journalists { get; set; }

        public DbSet<Subscription> Subscriptions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Subscription>()
            //    .HasOne(s => s.Journalist)
            //    .WithMany(j => j.Subscriptions)
            //    .HasForeignKey(s => s.JournalistId)
            //    .OnDelete(DeleteBehavior.Restrict);




        }
    }
}