const titles = require('../../../repository/titles');

const add = (req, res) => {
  const title = req.body.value;
  const id = titles.add(title);
  res.status(201).json({ id });
};

const get = (req, res) => {
  const id = req.params.id;
  const title = titles.get(id);
  if (title) {
    res.json(titles.get(id));
  } else {
    res.status(404).json({
      type: 'error',
      message: `Note ${id} not found` });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  titles.remove(id);
  res.status(204).send();
};

const getAll = (req, res) => {
  res.json(titles.getAll());
};

const update = (req, res) => {
  const id = req.params.id;
  const title = titles.get(id);
  const newTitle = req.body.value;
  titles.remove(title);
  titles.update(id, newTitle);
  res.status(201).json({ id });
};

module.exports = {
  get,
  getAll,
  update,
  remove,
  add,
};
