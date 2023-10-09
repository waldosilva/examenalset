using Alset.Api.Requests;
using Alset.Entity;
using Alset.Entity.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
//using Alset.Application;
//using Alset.Application.Services;
//using Alset.Application.Services.Interfaces;
//using Alset.Entity.Entities;

namespace Alset.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalController : ControllerBase
    {

        private AlsetContext _context;
        public JournalController(AlsetContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public Journal Get(int id)
        {

            return _context.Journals.Where(e => e.Id == id).Include("Journalist").FirstOrDefault();
        }
        [HttpGet]
        public List<Journal> GetAll()
        {

            return _context.Journals.Include("Journalist").ToList();
        }

        [HttpPost]
        public Journal CreatePost([FromBody] JournalRequest request)
        {
            var journal = new Journal();
            journal.Title = request.Title;
            journal.Journalist = _context.Journalists.Find(request.JournalistId);

            _context.Add(journal);
            _context.SaveChanges();
            return journal;

        }
        [HttpPut("{id}")]
        public Journal Modify(int id, [FromBody] JournalRequest request)
        {
            var journal = _context.Journals.Where(e => e.Id == id).First();
            if (journal != null)
            {

                journal.Title = request.Title;
                journal.JournalistId = request.JournalistId;
                _context.SaveChanges();
            }


            return journal;

        }



    }
}