using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace mei.Models
{
    public class AuthenticateDto
    {

        public string Email { get; set; }
        public string Senha { get; set; }


    }
}