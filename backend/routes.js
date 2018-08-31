const out = {};

out.upload = (req, res) => {
  console.log('new request');
  console.log(req.body);
  console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  for (let item in req.files) {
    console.log(req.files[item].name);
    req.files[item].mv('data/' + req.files[item].name, (err) => {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
  };
};

module.exports = out;