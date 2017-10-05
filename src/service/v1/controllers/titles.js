const titles = require('../../../repository/titles');

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

const getAll = (req, res) => {
  res.json(titles.getAll());
};

const remove = (req, res) => {
  const id = req.params.id;
  titles.remove(id);
  res.status(204).send();
};

const update = (req, res) => {
  const id = req.params.id;
  titles.remove(id);
  const newTitle = req.body.value;
  const newId = titles.add(newTitle);
  titles.update(id, newTitle);
  res.status(201).json({ newId });
};

const add = (req, res) => {
  const title = req.body.value;
  const id = titles.add(title);
  res.status(201).json({ id });
};

module.exports = {
  get,
  getAll,
  update,
  remove,
  add,
};
