﻿using Microsoft.AspNetCore.Identity;
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
                    var user = await _userManager.FindByNameAsync("admin@gmail.com"); // tim user admin
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
                      new Function() {Name = "Quản lý lớp",ParentId = 0,SortOrder = 1, URL = "Admin/Classes",IconCss = "fa-home"  },
                      new Function() {Name = "Quản lý môn học",ParentId = 0,SortOrder = 2, URL = "/Admin/Subjects",IconCss = "fa-home"  },
                      new Function() {Name = "Quản lý tài khoản",ParentId = 0, SortOrder = 3, URL = "",IconCss = "fa-home"  },
                      new Function() {Name = "Gia sư",ParentId = 3,SortOrder = 4, URL = "/Admin/Tutors",IconCss = "fa-home"  },
                      new Function() {Name = "Tài khoản thường",ParentId = 3,SortOrder = 4, URL = "/Admin/NormalAccount",IconCss = "fa-home"  }
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

            if (_context.Subjects.Count() == 0)
            {
                _context.Subjects.AddRange(new List<Subject>()
                {
                    new Subject() {Name= "Toán", Code="TOAN01"},
                    new Subject() {Name= "Ngữ Văn", Code="VAN01"},
                    new Subject() {Name="Vật Lý", Code="LY01"},
                    new Subject() {Name = "Hóa Học", Code="HOA01"}
                });
            }
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                string a = ex.ToString();
            }

            if (_context.Classes.Count() == 0)
            {
                _context.Classes.AddRange(new List<Class>()
                {
                    new Class() {Level="1", SubjectId = 1, Address="01 Vo Van Ngan", Salary = 1500000, NumberOfSessions=2, TeachingTime="T2, 3 Tối 5h30 hoặc 6h (1b=2 giờ)", Request="(Sinh viên Nam)", ContactInfo="123132123 - 123123123"},
                    new Class() {Level="2", SubjectId = 2, Address="02 Vo Van Ngan", Salary = 1900000, NumberOfSessions=2, TeachingTime="T2, 3 Tối 5h30 hoặc 6h (1b=2 giờ)", Request="(Sinh viên Nam)", ContactInfo="123132123 - 123123123"},
                    new Class() {Level="3", SubjectId = 3, Address="03 Vo Van Ngan", Salary = 2500000, NumberOfSessions=2, TeachingTime="T2, 3 Tối 5h30 hoặc 6h (1b=2 giờ)", Request="(Sinh viên Nam)", ContactInfo="123132123 - 123123123"}
                });
            }
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                string a = ex.ToString();
            }
        } 
    }
}