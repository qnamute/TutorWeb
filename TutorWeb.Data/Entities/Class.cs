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

        public Class(int id, string level, int subjectId, int address, decimal salary, int numberOfSessions, string teachingTime, string request, string contactInfo, DateTime dateCreated, DateTime dateModified)
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
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public Class(string level, int subjectId, int address, decimal salary, int numberOfSessions, string teachingTime, string request, string contactInfo, Subject subject, DateTime dateCreated, DateTime dateModified)
        {
            Level = level;
            SubjectId = subjectId;
            Address = address;
            Salary = salary;
            NumberOfSessions = numberOfSessions;
            TeachingTime = teachingTime;
            Request = request;
            ContactInfo = contactInfo;
            Subject = subject;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        public string Level { get; set; }

        public int SubjectId { get; set; }

        public int Address { get; set; }

        public decimal Salary { get; set; }

        public int NumberOfSessions { get; set; }

        public string TeachingTime { get; set; }

        public string Request { get; set; }

        public string ContactInfo { get; set; }

        public virtual Subject Subject { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}