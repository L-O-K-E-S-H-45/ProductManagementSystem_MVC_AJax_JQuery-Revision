using Microsoft.EntityFrameworkCore;
using ProductManagementSystem_MVC_AJax_JQuery.Models.Entity;

namespace ProductManagementSystem_MVC_AJax_JQuery.Models.Context
{
    public class ProductContext : DbContext
    {

        public ProductContext(DbContextOptions dbContextOptions) :  base(dbContextOptions){}

        public DbSet<Product> products { get; set; }

    }
}
