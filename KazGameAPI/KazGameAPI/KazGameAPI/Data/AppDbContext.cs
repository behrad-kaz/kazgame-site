using KazGameAPI.Models; 
using Microsoft.EntityFrameworkCore;
using static NewsArticle;

namespace KazGameAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<NewsArticle> NewsArticles { get; set; }
        public DbSet<Poll> Polls { get; set; }
        public DbSet<UserFavoriteGame> UserFavoriteGames { get; set; }
        public DbSet<UserLikedArticle> UserLikedArticles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
            base.OnModelCreating(modelBuilder);
            // تعریف کلید اصلی ترکیبی برای جدول واسط
            modelBuilder.Entity<UserFavoriteGame>()
                .HasKey(ufg => new { ufg.UserId, ufg.ProductId });

            // تعریف رابطه چند به چند بین User و Product
            modelBuilder.Entity<UserFavoriteGame>()
                .HasOne(ufg => ufg.User)
                .WithMany(u => u.FavoriteGames)
                .HasForeignKey(ufg => ufg.UserId);

            modelBuilder.Entity<UserFavoriteGame>()
                .HasOne(ufg => ufg.Product)
                .WithMany(p => p.FavoritedByUsers)
                .HasForeignKey(ufg => ufg.ProductId);

            modelBuilder.Entity<UserLikedArticle>()
       .HasKey(ula => new { ula.UserId, ula.ArticleId });

            modelBuilder.Entity<UserLikedArticle>()
                .HasOne(ula => ula.User)
                .WithMany(u => u.LikedArticles)
                .HasForeignKey(ula => ula.UserId);

            modelBuilder.Entity<UserLikedArticle>()
                .HasOne(ula => ula.Article)
                .WithMany(a => a.LikedByUsers)
                .HasForeignKey(ula => ula.ArticleId);
        }
    }
}