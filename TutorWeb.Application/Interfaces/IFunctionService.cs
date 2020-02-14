using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TutorWeb.Application.ViewModels;

namespace TutorWeb.Application.Interfaces
{
    public interface IFunctionService : IDisposable
    {
        Task<List<FunctionViewModel>> GetAll();

        List<FunctionViewModel> GetAllByPermission(Guid userId);
    }
}