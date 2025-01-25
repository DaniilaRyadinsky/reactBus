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
            return Ok(ClassContext.Users.Select(u => new UserVIEW() { Login = u.Login, Password = u.Password, Email = u.Email, Id = u.Id, FirstName = u.FirstName, MiddleName = u.MiddleName, LastName = u.LastName, PhoneNumber = u.PhoneNumber }));
        }

        [HttpGet("ordersbylogin")]

        public async Task<ActionResult<List<ResicleBinView>>> GetOrdersById([FromQuery] string Login)
        {
            var user = await ClassContext.Users.FirstOrDefaultAsync(u => u.Login == Login);
            if (user == null) return BadRequest();
            return Ok(ClassContext
                .Set<UserBus>()
                .Where(ub => ub.UserId == user.Id)
                .Select(i => new ResicleBinView()
                {
                    Id = i.Bus.Id,
                    Title = i.Bus.Params.Title,
                    Image = i.Bus.Image.Image,
                    Category = i.Bus.Params.Category,
                    Price = i.Bus.Params.Price,
                    Quantity = i.Quantity.ToString()
                }));
        }

        [HttpPost("reg")]
        public async Task<ActionResult> Registration([FromBody] UserVIEW inputData)
        {
            if (await ClassContext.Users.FirstOrDefaultAsync(u => u.Login == inputData.Login) != null)
                return BadRequest("User already exists.");
            string salt = BCrypt.Net.BCrypt.GenerateSalt(6);
            // Хеширование пароля
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(inputData.Password, salt);
            string hashedEmail = BCrypt.Net.BCrypt.HashPassword(inputData.Email, salt);
            string hashedFirstName = BCrypt.Net.BCrypt.HashPassword(inputData.FirstName, salt);
            string hashedMiddleName = BCrypt.Net.BCrypt.HashPassword(inputData.MiddleName, salt);
            string hashedLastName = BCrypt.Net.BCrypt.HashPassword(inputData.LastName, salt);
            string hashedPhoneNumber = BCrypt.Net.BCrypt.HashPassword(inputData.PhoneNumber, salt);

            await ClassContext.Users.AddAsync(
                new User()
                {
                    Id = Guid.NewGuid(),
                    Login = inputData.Login,
                    Password = hashedPassword,
                    Email = hashedEmail,
                    FirstName = hashedFirstName,
                    MiddleName = hashedMiddleName,
                    LastName = hashedLastName,
                    PhoneNumber = hashedPhoneNumber
                });

            await ClassContext.SaveChangesAsync();
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public ActionResult<Authorize> Login([FromBody] UserVIEW inputData)
        {
            User? foundUser = ClassContext.Users.FirstOrDefault(p => p.Login == inputData.Login);

            if (foundUser is null || !BCrypt.Net.BCrypt.Verify(inputData.Password, foundUser.Password))
                return Unauthorized("Invalid login or password.");

            var claims = new List<Claim>
        {
            new(ClaimTypes.Name, foundUser.Login!)
        };

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(60)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            Authorize response = new()
            {
                Token = encodedJwt,
                Username = foundUser.Login!
            };

            return Ok(response);
        }

        [HttpDelete("{id::guid}")]
        public async Task<ActionResult<Guid>> Delete(Guid id)
        {
            if (await ClassContext.Users.FirstOrDefaultAsync(m => m.Id == id) == null)
                return BadRequest();

            await ClassContext.Users.Where(m => m.Id == id).ExecuteDeleteAsync();

            return Ok();
        }
        [HttpDelete("full")]
        public async Task<ActionResult<Guid>> DeleteFull()
        {
            await ClassContext.Users.Where(a => true).ExecuteDeleteAsync();

            return Ok();
        }
    }
}
