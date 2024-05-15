using Microsoft.AspNetCore.Mvc;

namespace enigmaworkshop.backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        [HttpPost]
        [Route("product/{id}")]
        public IActionResult UploadFile(List<IFormFile> files, string id)
        {
            // get and save file to wwwroot/files/image/product/{id} folder
            foreach (var file in files)
            {
                var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files/image/product", id);
                if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
                var filePath = Path.Combine(folderPath, file.FileName);
                System.Console.WriteLine("FUCK" + filePath);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }
            var fileNames = files.Select(file => $"http://localhost:5257/files/image/product/{id}/{file.FileName}").ToList();
            return Ok(fileNames);
        }
    }
}