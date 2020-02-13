const express = require('express');
const users = require('./userDb');
const post = require('../posts/postDb');


const router = express.Router();

router.use('./id/post', postRouter)


router.post('/', validateUser(), (req, res) => {
  // do your magic!
  user.insert(req.user)
  .then(data => res.json(data))
  .catch(err => res.status(500).json({message: 'User cannot be made'}))
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!
post.insert(req.text)
.then(data => res.json(data))
.catch(err => res.status(500).json({error: 'Post cannot be made'}))
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then(data => res.json(data))
  .catch(err => res.status(404).json({message: 'could not find users'}))
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.json(req.user)
});

router.get('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // do your magic!
post.insert(req.text)
.then(data => res.json(data))
.catch(err => res.status(500).json({error: 'Post cannot be made'}))
});

router.delete('/:id', validateUserId(), (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then(count => {
    res.status(200).json({message: 'could not delete user'})
  })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  // do your magic!
  users.update(req.params.id, req.user)
  .then(data => res.json(data))
  .catch(err => res.status(404).json({message: 'coulc not update user'}))

});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
  .then(user => {
    if(user) {
      req.user = user
      next()
    } else {
      res.status(404).json({message: 'could not find user with this ID'})
    }

  })
  .catch(err => res.status(500).json({message: 'error gettign user with this ID'}))
}

function validateUser(req, res, next) {
  // do your magic!
 resource = {
   name: req.body.name
 }
 if(!req.body.name){
   return res.status(404).json({message: 'missing user data'})
 } else {
   req.user = resource
   next()
 }
}

function validatePost(req, res, next) {
  // do your magic!
  resource = {
    text: req.body.text,
    user_id: req.params.id
  }
  if(!req.body.text){
    return res.status(404).json({message: 'missing post data'})
  } else {
    req.text = resource
    next()
  }
}

module.exports = router;
