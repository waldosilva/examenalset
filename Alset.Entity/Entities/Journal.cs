using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alset.Entity.Entities
{
    public class Journal
    {


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }


        public int JournalistId { get; set; }
        [ForeignKey("JournalistId")]
        public virtual Journalist Journalist { get; set; }

        public string? Pdf { get; set; }
    }
}
