using Microsoft.AspNetCore.Mvc;
using new_egg_timer.Models;
using System.Globalization;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace new_egg_timer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EggTimerController : ControllerBase
    {
        private readonly string filePath = Path.Combine(Directory.GetCurrentDirectory(), "data", "eggTimerData.json");

        // POST api/eggtimer
        [HttpPost]
        public async Task<IActionResult> SaveEggTimerData([FromBody] EggTimerData data)
        {
            // german date format
            var formattedStartTime = data.StartTime.ToString("dd.MM.yyyy HH:mm:ss", CultureInfo.GetCultureInfo("de-DE"));

            var jsonData = JsonSerializer.Serialize(new
            {
                EggType = data.EggType,
                StartTime = formattedStartTime,  
                Duration = data.Duration
            });

            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);  
            }

            await System.IO.File.AppendAllTextAsync(filePath, jsonData + "\n");  

            return Ok(new { message = "Daten gespeichert!" });
        }
    }
}
