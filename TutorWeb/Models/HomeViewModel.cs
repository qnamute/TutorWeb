using System.Collections.Generic;
using TutorWeb.Application.ViewModels;

namespace TutorWeb.Models
{
    public class HomeViewModel
    {
        public List<ClassViewModel> ListSlider { get; set; }

        public List<ClassViewModel> PopularClasses { get; set; }

        public List<ClassViewModel> NewClasses { get; set; }
    }
}