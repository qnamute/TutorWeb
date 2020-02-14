using AutoMapper;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.Entities;

namespace TutorWeb.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<Class, ClassViewModel>();
            CreateMap<Function, FunctionViewModel>();
            CreateMap<Subject, SubjectViewModel>();
            CreateMap<RegisterClass, RegisterClassViewModel>();
        }
    }
}