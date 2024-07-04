using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using ProductManagementSystem_MVC_AJax_JQuery.Models.Context;
using ProductManagementSystem_MVC_AJax_JQuery.Models.Entity;

namespace ProductManagementSystem_MVC_AJax_JQuery.Controllers
{
    public class ProductController : Controller
    {
        private readonly ProductContext productContext;

        public ProductController(ProductContext productContext)
        {
            this.productContext = productContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllProducts()
        {
            List<Product> products = productContext.products.ToList();
            return new JsonResult(products);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            product.TotalPrice = product.Quantity * product.Price;
            productContext.products.Add(product);
            productContext.SaveChanges();
            return Json(productContext.products);
        }

        public JsonResult Delete(int productId)
        {
            Product product = productContext.products.Where(p => p.ProductId == productId).FirstOrDefault();
            productContext.products.Remove(product);
            productContext.SaveChanges();
            return new JsonResult("Product deleted successfully");
        }

        [HttpGet]
        public JsonResult Edit(int productId)
        {
            Product product = productContext.products.Where(product => product.ProductId == productId).SingleOrDefault();
            return new JsonResult(product);
        }

        [HttpPost]
        public JsonResult UpdateProduct(Product product)
        {
            product.TotalPrice = product.Quantity * product.Price;
            productContext.products.Update(product);
            productContext.SaveChanges();
            return new JsonResult("Product updated successfully");
        }

        [HttpGet]
        public IActionResult SearchProduct(string productName)
        {
            if (string.IsNullOrEmpty(productName))
                return Json(productContext.products);
            List<Product> products = productContext.products
            .Where(product => product.ProductName.ToLower().Contains(productName.ToLower())).ToList();
            return new JsonResult(products);
        }

    }
}
