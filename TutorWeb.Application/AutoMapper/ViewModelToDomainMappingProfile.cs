using AutoMapper;
using TutorWeb.Application.ViewModels;
using TutorWeb.Data.Entities;

namespace Easy2GetRoom.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<ClassViewModel, Class>()
                .ConstructUsing(c => new Class(c.Id, c.Level, c.SubjectId, c.Address, c.Salary, c.NumberOfSessions, c.TeachingTime,
                c.Request, c.ContactInfo, c.DateCreated, c.DateModified));

            CreateMap<FunctionViewModel, Function>()
                .ConstructUsing(c => new Function(c.Id, c.Name, c.URL, c.ParentId, c.IconCss,
                     c.SortOrder));

            CreateMap<SubjectViewModel, Subject>()
                .ConstructUsing(c => new Subject(c.Id, c.Code, c.Name, c.DateCreated, c.DateModified));

            CreateMap<RegisterClassViewModel, RegisterClass>()
                .ConstructUsing(c => new RegisterClass(c.ClassId, c.UserId, c.DateCreated, c.DateModified));
        
        }
    }
}