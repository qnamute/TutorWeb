using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using TutorWeb.Data.Entities;

namespace TutorWeb.Data.EF
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private UserManager<User> _userManager;
        private RoleManager<Role> _roleManager;

        public DbInitializer(AppDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                var _item1 = new Role()
                {
                    Name = "Admin",
                    Description = "Quản Trị Hệ Thống"
                };
                await _roleManager.CreateAsync(_item1);

                var _item2 = new Role()
                {
                    Name = "Teacher",
                    Description = "Gia Sư"
                };
                await _roleManager.CreateAsync(_item2);

                var _item3 = new Role()
                {
                    Name = "Student",
                    Description = "Học sinh"
                };
                await _roleManager.CreateAsync(_item3);
            }
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                string a = ex.ToString();
            };

            if (!_userManager.Users.Any())
            {
                var check = await _userManager.CreateAsync(new User()
                {
                    UserName = "admin",
                    FullName = "Đinh Quang Nam",
                    Email = "admin@gmail.com",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                }, "123456$");

                if (check.Succeeded)
                {
                    var user = await _userManager.FindByNameAsync("admin"); // tim user admin
                    _userManager.AddToRoleAsync(user, "Admin").Wait(); // add admin vao role admin
                }
            }
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                string a = ex.ToString();
            };
        }
    }
}