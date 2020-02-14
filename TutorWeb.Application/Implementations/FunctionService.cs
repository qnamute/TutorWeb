using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using TutorWeb.Application.Interfaces;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.IRepositories;

namespace TutorWeb.Application.Implementations
{
    public class FunctionService : IFunctionService
    {
        private IFunctionRepository _functionRepository;
        private readonly IMapper _mapper;

        public FunctionService(IFunctionRepository functionRepository, IMapper mapper)
        {
            _functionRepository = functionRepository;
            _mapper = mapper;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public Task<List<FunctionViewModel>> GetAll()
        {
            return _functionRepository.FindAll().ProjectTo<FunctionViewModel>().ToListAsync();
        }

        public List<FunctionViewModel> GetAllByPermission(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}