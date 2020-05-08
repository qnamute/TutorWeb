using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TutorWeb.Data.Interfaces;

namespace TutorWeb.Data.Entities
{
    [Table("Users")]
    public class User : IdentityUser<Guid>, IDateTracking
    {
        public User()
        {
        }

        public User(string fullName, string gender, string userEmail, DateTime? birthDay, string avatar, DateTime dateCreated, DateTime dateModified)
        {
            FullName = fullName;
            Gender = gender;
            UserEmail = userEmail;
            BirthDay = birthDay;
            Avatar = avatar;
            DateCreated = dateCreated;
            DateModified = dateModified;
        }

        [StringLength(255)]
        public string FullName { get; set; }

        [StringLength(255)]
        public string Gender { get; set; }

        [StringLength(255)]
        public string UserEmail { get; set; }

        [StringLength(1000)]
        public string Literacy { get; set; }

        public DateTime? BirthDay { get; set; }

        public string Avatar { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}