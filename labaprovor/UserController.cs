using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace labaprovor
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(ClassContext ClassContext) : ControllerBase
    {
        private ClassContext ClassContext { get; set; } = ClassContext;

        [HttpGet("fullusers")]
        public ActionResult<List<UserVIEW>> GetUsers()
        {
            return Ok(ClassContext.Users.Select(u => new UserVIEW() { Login = u.Login, Password = u.Password, Email = u.Email, Id = u.Id }));
        }

        [HttpGet("allcategorybyuser")]
        public async Task<ActionResult<List<string>>> GetAllCategoryByUser([FromQuery] string Login)
        {
            return Ok(
                ClassContext
                    .Users
                    .FirstOrDefault(u => u.Login == Login)!
                    .Buses
                    .Select(bp => bp.Params.Category)
                    .Distinct()
                    .ToList()
                );
        }

        [HttpGet("ordersbylogin")]

        public ActionResult<List<BusVIEEEEEW>> GetOrdersById([FromQuery] string Login, string Category)
        {
            return Ok(ClassContext
                .Users
                .FirstOrDefault(u => u.Login == Login)!
                .Buses
                .Where(bs => bs.Params.Category == Category)
                .Select(i => new BusVIEEEEEW()
            {
                Id = i.Id,
                Title = i.Params.Title,
                Description = i.Params.Description,
                Consumption = i.Params.Consumption,
                Services = i.Params.Services,
                Speed = i.Params.Speed,
                Сapacity = i.Params.Сapacity,
                Image = i.Image.Image,
                Category = i.Params.Category,
                Price = i.Params.Price,
            }));
        }

        [HttpPost("reg")]
        public async Task<ActionResult> Registration([FromBody] UserVIEW inputData)
        {
            if (await ClassContext.Users.FirstOrDefaultAsync(u => u.Login == inputData.Login) != null)
                return BadRequest();

            await ClassContext.Users.AddAsync(
                    new User() { Id = Guid.NewGuid(), Login = inputData.Login, Password = inputData.Password, Email = inputData.Email }
                );
            await ClassContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult<Authorize> Login([FromBody] UserVIEW inputData)
        {
            User? foundUser = ClassContext.Users.FirstOrDefault(p => p.Login == inputData.Login && p.Password == inputData.Password);

            if (foundUser is null) return Unauthorized();

            var claims = new List<Claim> { new(ClaimTypes.Name, foundUser.Login!) };


            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);


            Authorize response = new() { Token = encodedJwt, Username = foundUser.Login! };
            return Ok(response);
        }
    }
}
