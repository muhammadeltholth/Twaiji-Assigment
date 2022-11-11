using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using twaijri.Models;

namespace twaijri.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   

    public class CustomersController : ControllerBase
    {
        private readonly twaijrDbContext _context;

        public CustomersController(twaijrDbContext context)
        {
            _context = context;
        }
        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customers.Include(c => c.Invoices).ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // POST: api/Customers
        [HttpPost()]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer)
        {

       
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, Customer customerNew)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return BadRequest("Not Found");
            }

            customer.CustomerName = customerNew.CustomerName;
            customer.PhoneNumber = customerNew.PhoneNumber;

            _context.Customers.Update(customer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(customer);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(200);
        }
    }
}
