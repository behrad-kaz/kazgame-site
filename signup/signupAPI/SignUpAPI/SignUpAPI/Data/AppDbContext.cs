using Microsoft.EntityFrameworkCore;
using KazGameAPI.Models;
using System.Collections.Generic;

namespace KazGameAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}