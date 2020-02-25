using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using TutorWeb.Application.Interfaces;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.IRepositories;
using TutorWeb.Infrastructure.Interfaces;
using TutorWeb.Utilities.Dtos;

namespace TutorWeb.Application.Implementations
{
    public class ClassService : IClassService
    {
        private IClassRepository _classRepository;
        private IUnitOfWork _unitOfWork;

        public ClassService(IClassRepository classRepository, IUnitOfWork unitOfWork)
        {
            _classRepository = classRepository;
            _unitOfWork = unitOfWork;
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public List<ClassViewModel> GetAll()
        {
            var query = _classRepository.FindAll();
            return query.ProjectTo<ClassViewModel>().ToList();
        }

        public PagedResult<ClassViewModel> GetAllPaging(string keyWord, int page, int pageSize)
        {
            var query = _classRepository.FindAll();
            if (!string.IsNullOrEmpty(keyWord))
            {
                query = query.Where(x => x.Address.Contains(keyWord));
            }

            int totalRow = query.Count();

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ProjectTo<ClassViewModel>().ToList();

            var paginationSet = new PagedResult<ClassViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };

            return paginationSet;
        }

        public ClassViewModel GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Update(ClassViewModel classViewModel)
        {
            throw new NotImplementedException();
        }
    }
}