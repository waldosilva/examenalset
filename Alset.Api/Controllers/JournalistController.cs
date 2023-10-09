using Alset.Api.Requests;
using Alset.Entity;
using Alset.Entity.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
//using Alset.Application;
//using Alset.Application.Services;
//using Alset.Application.Services.Interfaces;
//using Alset.Entity.Entities;

namespace Alset.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalistController : ControllerBase
    {

        private AlsetContext _context;
        public JournalistController(AlsetContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public Journalist Get(int id)
        {

            return _context.Journalists.Where(e => e.Id == id).FirstOrDefault();
        }
        [HttpGet]
        public List<Journalist> GetAll()
        {

            return _context.Journalists.ToList();
        }

        [HttpPost]
        public Journalist CreatePost([FromBody] JournalListRequest request)
        {
            var journalist = new Journalist();
            journalist.Email = request.Email;
            journalist.Name = request.Name;
            _context.Add(journalist);
            _context.SaveChanges();
            foreach (var item in request.subscriptions)
            {
                var subscription = new Subscription();
                subscription.SuscriptorId = item;
                subscription.JournalistId = journalist.Id;
                _context.Add(subscription);
                _context.SaveChanges();
            }

            return journalist;

        }
        [HttpPut("{id}")]
        public Journalist Modify(int id, [FromBody] JournalListRequest request)
        {
            var journalist = _context.Journalists.Where(e => e.Id == id).First();
            if (journalist != null)
            {
                journalist.Email = request.Email;
                journalist.Name = request.Name;
                _context.SaveChanges();
            }
            //Removemos todas las relaciones
            var subscriptionsToDelete = _context.Subscriptions.Where(s => s.JournalistId == journalist.Id).Select(e=>e.Id).ToList();
            foreach (var item in subscriptionsToDelete)
            {
                var subscription = _context.Subscriptions.Where(s => s.Id == item).FirstOrDefault();
                _context.Subscriptions.Remove(subscription);
                _context.SaveChanges();
            }


            foreach (var item in request.subscriptions)
            {
                var subscription = new Subscription();
                subscription.SuscriptorId = item;
                subscription.JournalistId = journalist.Id;
                _context.Add(subscription);
                _context.SaveChanges();
            }

            return journalist;

        }



    }
}