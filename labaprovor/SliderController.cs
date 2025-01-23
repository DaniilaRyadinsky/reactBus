using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labaprovor
{
    [ApiController]
    [Route("[controller]")]
    public class SliderController(ClassContext ClassContext) : ControllerBase
    {
        private ClassContext ClassContext { get; set; } = ClassContext;


        [HttpGet]
        public async Task<ActionResult<List<Slider>>> GetSliders()
        {
            return Ok(
                await ClassContext.Sliders.ToListAsync()
                );
        }

        [HttpPost]
        public async Task<ActionResult> AddSlider([FromBody] Slider _request)
        {
            try
            {
                await ClassContext.Sliders.AddAsync(new Slider() { Id = Guid.NewGuid(), Image = _request.Image});
                await ClassContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
