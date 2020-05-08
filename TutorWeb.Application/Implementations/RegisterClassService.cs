using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using TutorWeb.Application.Interfaces;
using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Application.Implementations
{
    public class RegisterClassService : IRegisterClassService
    {
        private IRegisterClassRepository _registerClassRepository;
        private UserManager<User> _userManager;

        public RegisterClassService(IRegisterClassRepository registerClassRepository, UserManager<User> userManager)
        {
            _registerClassRepository = registerClassRepository;
            _userManager = userManager;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public List<User> GetAllTutor()
        {
            var query = _userManager.Users.ToListAsync().Result;
            return query;
        }

        public void Save()
        {
            throw new NotImplementedException();
        }
    }
}