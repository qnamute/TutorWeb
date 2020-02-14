using System;
using System.Collections.Generic;
using TutorWeb.Application.ViewModels;

namespace TutorWeb.Application.Interfaces
{
    public interface IRegisterClassService : IDisposable
    {
        void Delete(int id);

        void Save();
    }
}