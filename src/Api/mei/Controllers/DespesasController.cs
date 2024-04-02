using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace mei.Controllers
{
    public class DespesasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
