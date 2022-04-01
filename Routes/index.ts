import express from 'express';
const router = express.Router();

// import the database
import Contact from "../Models/contact";

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET home page. */
router.get('/home', function(req, res, next) 
{
  res.render('index', { title: 'Home', page: 'home', displayName: '' });
});

/* GET abput page. */
router.get('/about', function(req, res, next) 
{
  res.render('index', { title: 'About Us', page: 'about', displayName: '' });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) 
{
  res.render('index', { title: 'Our Projects', page: 'projects', displayName: '' });
});

/* GET services page. */
router.get('/services', function(req, res, next) 
{
  res.render('index', { title: 'Our Services', page: 'services', displayName: '' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) 
{
  res.render('index', { title: 'Contact Us', page: 'contact', displayName: '' });
});

/* GET login page. */
router.get('/login', function(req, res, next) 
{
  res.render('index', { title: 'Login', page: 'login', displayName: '' });
});

/* GET projects page. */
router.get('/register', function(req, res, next) 
{
  res.render('index', { title: 'Register', page: 'register', displayName: '' });
});

/* Temporary routes - Contact-List related

/* GET contact-list page. */
router.get('/contact-list', function(req, res, next) 
{
  // Display contacts from the database
  Contact.find(function(err, contactList)
  {
    if(err)
    {
      console.error("Encountered and Error reading from the Database: " + err.message);
      res.end();
    }

    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactList, displayName: '' });
  });

  
});

/* Displays the Add Page */
router.get('/add', function(req, res, next) 
{
  res.render('index', { title: 'Add Contact', page: 'edit', contact: '', displayName: '' });
});


/* Process the Add Request */
router.post('/add', function(req, res, next) 
{

  // Instantiate a new contact to add
  let newContact = new Contact
  ({
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress,
  });

  // db.contacts.insert({contact data goes here})
  Contact.create(newContact, function(err: ErrorCallback)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    // create newContact is successful -> no go back to the contct list page
    res.redirect('/contact-list');
  });
});




/* Displays the Edit Page with Data */
router.get('/edit/:id', function(req, res, next) 
{

  // /edit/:id
  let id = req.params.id;
  // fpass the id to the db and read it in
  Contact.findById(id, {}, {}, function(err, contactToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    //show the edit view with the data
    res.render('index', { title: 'Edit Contact', page: 'edit', contact: contactToEdit, displayName: '' });

  });
});


/* Process the Update request */
router.post('/edit/:id', function(req, res, next) 
{
  // /edit/:id
  let id = req.params.id;

  // Instantiate a new contact object
  let updatedContact = new Contact
  ({
    "_id": id,
    "FullName": req.body.fullName,
    "ContactNumber": req.body.contactNumber,
    "EmailAddress": req.body.emailAddress,
  });

  // db.contacts.update({"_id": id}, the stuff to update)
  Contact.updateOne({_id: id}, updatedContact,function(err: ErrorCallback)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // We are successful redirect update and redirect
    res.redirect('/contact-list');
  });
});

/* Process the Delete request */
router.get('/delete/:id', function(req, res, next) 
{
  // /delete/:id
  let id = req.params.id;
  // db.contacts.remove({"_id":id})
  Contact.remove({_id: id}, function(err)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    // if remove successful redirect
    res.redirect('/contact-list');

  });
});


export default router;
