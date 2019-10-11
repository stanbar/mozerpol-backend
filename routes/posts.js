var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('../mozerpol.db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let posts = [];
  db.all("SELECT rowid AS id, content FROM Post", (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      let { id, content } = row;
      console.log(id + ": " + content);
      posts.push({ id, content });
    });
    res.send(posts);
  });
});

router.post('/', function(req, res, next) {
  let content = req.body.content;
  console.log(`content: ${content}`);
  if (!content) {
    return res.send('Can not create empty post');
  }
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO Post VALUES (?)");
    stmt.run(content);
    stmt.finalize();
    res.send('Created post');
  });

});

router.delete('/:postId', (req, res, next) => {
  let postId = req.params.postId;
  db.run('DELETE FROM Post WHERE rowid=?', postId, (err) => {
    if(err){
      throw err;
    }
    res.send(`Removed post: ${postId} successfully`);
  })
})

module.exports = router;
