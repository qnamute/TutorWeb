using System.Collections.Generic;

namespace TutorWeb.Utilities.Dtos
{
    //Generic type
    public class PagedResult<T> : PagedResultBase where T : class
    {
        public PagedResult()
        {
            Results = new List<T>();
        }

        public IList<T> Results { get; set; }
    }
}