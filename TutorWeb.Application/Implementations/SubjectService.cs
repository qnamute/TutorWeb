using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TutorWeb.Application.Interfaces;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.Entities;
using TutorWeb.Data.IRepositories;
using TutorWeb.Infrastructure.Interfaces;
using TutorWeb.Utilities.Dtos;

namespace TutorWeb.Application.Implementations
{
    public class SubjectService : ISubjectService
    {
        private ISubjectRepository _subjectRepository;
        private IUnitOfWork _unitOfWork;

        public SubjectService(ISubjectRepository subjectRepository, IUnitOfWork unitOfWork)
        {
            _subjectRepository = subjectRepository;
            _unitOfWork = unitOfWork;
        }

        public void Delete(int id)
        {
            _subjectRepository.Remove(id);
            _unitOfWork.Commit();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public List<SubjectViewModel> GetAll()
        {
            var query = _subjectRepository.FindAll();
            return query.ProjectTo<SubjectViewModel>().ToList();
        }

        public PagedResult<SubjectViewModel> GetAllPaging(int page, int pageSize)
        {
            var query = _subjectRepository.FindAll();

            int totalRow = query.Count();

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ProjectTo<SubjectViewModel>().ToList();

            var paginationSet = new PagedResult<SubjectViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };

            return paginationSet;
        }

        public SubjectViewModel GetById(int id)
        {
            var data = _subjectRepository.FindById(id);
            return Mapper.Map<Subject, SubjectViewModel>(data);
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Update(SubjectViewModel subjectViewModel)
        {
            throw new NotImplementedException();
        }
    }
}