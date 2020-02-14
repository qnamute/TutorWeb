using System;

namespace TutorWeb.Application.ViewModels
{
    internal class RegisterClassViewModel
    {
        public int Id { get; set; }

        public int ClassId { get; set; }

        public Guid UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}