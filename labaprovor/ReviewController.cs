using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labaprovor
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewController(ClassContext ClassContext) : ControllerBase
    {
        private ClassContext ClassContext { get; set; } = ClassContext;


        [HttpGet("fullreviews")]
        public async Task<ActionResult<List<Review>>> GetReviews()
        {
            return Ok(
                await ClassContext.Reviews.ToListAsync()
                );
        }

        [HttpPost]
        public async Task<ActionResult> AddReview([FromBody] Review _request)
        {
            try
            {
                await ClassContext.Reviews.AddAsync(new Review() { Id = Guid.NewGuid(), Email = _request.Email, Message = _request.Message, Name = _request.Name, Theme = _request.Theme });
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
