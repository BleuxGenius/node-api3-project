const express = require('express');
const posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then(data => res.json(data))
  .catch(err => res.status(404).json({message: 'could not find post'}))
});

router.get('/:id',validatePostId(), (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
  .then(data => res.json(data))
  .catch(err => res.status(404).json({message: 'could not find with this ID'}))
});

router.delete('/:id', validatePostId(), (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
  .then(count => {
    res.status(200).json({message: 'could not delete post'})
  })
});

router.put('/:id', validatePostId(), (req, res) => {
  // do your magic!
posts.update(req.params.id, req.text)
.then(data => res.json(data))
.catch(err => res.status(404).json({message: 'could not update post'}))
});

// custom middleware
function validatePostId(req, res, next) {
  posts.getById(req.params.id)
  .then(post => {
    if (post) {
      req.post = post
      next()
    } else {
      res.status(404).json({message: 'could not find post with ID'})
    }
  })
  .catch(err => res.status(500).json({message: 'error getting post wiht this ID'}))
}

function validatePostId(req, res, next) {
  // do your magic!
  resource = {
    text: req.body.text
  }

  if(!req.body.text){
    return res.status(404).json({message: 'missing post data'})
  } else {
    req.text = resource
    next()
  }
  }

module.exports = router;
