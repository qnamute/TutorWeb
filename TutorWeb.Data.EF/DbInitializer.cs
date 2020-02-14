using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
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
                    UserName = "admin@gmail.com",
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

            if (_context.Functions.Count() == 0)
            {
                _context.Functions.AddRange(new List<Function>()
                {
                      new Function() {Name = "Quản lý bài đăng",ParentId = 0,SortOrder = 1,URL = "",IconCss = "fa-tasks"  },
                      new Function() {Name = "Quản lý lớp",ParentId = 0,SortOrder = 1, URL = "/Admin/Property",IconCss = "fa-home"  },
                      new Function() {Name = "Quản lý môn học",ParentId = 0,SortOrder = 2, URL = "/Admin/ActiveProperty",IconCss = "fa-home"  },
                      new Function() {Name = "Quản lý tài khoản",ParentId = 0, SortOrder = 3, URL = "/Admin/InActiveProperty",IconCss = "fa-home"  },
                      new Function() {Name = "Gia sư",ParentId = 4,SortOrder = 4, URL = "/Admin/AwaitingApprovalProperty",IconCss = "fa-home"  },
                      new Function() {Name = "Tài khoản thường",ParentId = 4,SortOrder = 4, URL = "/Admin/AwaitingApprovalProperty",IconCss = "fa-home"  }
                });
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