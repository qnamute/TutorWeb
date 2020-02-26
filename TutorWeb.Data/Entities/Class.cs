using System;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;
using TutorWeb.Infrastructure.ShareKernel;

namespace TutorWeb.Data.Entities
{
    [Table("Classes")]
    public class Class : DomainEntity<int>, IDateTracking
    {
        public Class()
        {
        }

        public Class(string level, int subjectId, string address, decimal salary, int numberOfSessions, string teachingTime, string request, string contactInfo, 
            bool isSliderDisplay, DateTime dateCreated, DateTime dateModified)
        {
            Level = level;
            SubjectId = subjectId;
            Address = address;
            Salary = salary;
            NumberOfSessions = numberOfSessions;
            TeachingTime = teachingTime;
            Request = request;
            ContactInfo = contactInfo;
            IsSliderDisplay = isSliderDisplay;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public Class(int id, string level, int subjectId, string address, decimal salary, int numberOfSessions,
            string teachingTime, string request, string contactInfo, bool isSliderDisplay, DateTime dateCreated, DateTime dateModified)
        {
            Id = id;
            Level = level;
            SubjectId = subjectId;
            Address = address;
            Salary = salary;
            NumberOfSessions = numberOfSessions;
            TeachingTime = teachingTime;
            Request = request;
            ContactInfo = contactInfo;
            IsSliderDisplay = isSliderDisplay;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public string Level { get; set; }

        public int SubjectId { get; set; }

        public string Address { get; set; }

        public decimal Salary { get; set; }

        public int NumberOfSessions { get; set; }

        public string TeachingTime { get; set; }

        public string Request { get; set; }

        public string ContactInfo { get; set; }

        public bool IsSliderDisplay { get; set; }

        public virtual Subject Subject { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}