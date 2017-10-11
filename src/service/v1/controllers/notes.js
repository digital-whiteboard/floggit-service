const notes = require('../../../repository/notes');

const get = (req, res) => {
  const id = req.params.id;
  const note = notes.get(id);
  if (note) {
    res.json(notes.get(id));
  } else {
    res.status(404).json({
      type: 'error',
      message: `Note ${id} not found` });
  }
};

const getAll = (req, res) => {
  res.json(notes.getAll());
};

const remove = (req, res) => {
  const id = req.params.id;
  notes.remove(id);
  res.status(204).send();
};

const add = (req, res) => {
  const title = req.body.title;
  const noteList = req.body.noteList;
  const color = req.body.color;
  const id = notes.add(title, noteList, color);
  res.status(201).json({ id });
};

const update = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const noteList = req.body.noteList;
  const color = req.body.color;
  notes.update(id, title, noteList, color);
  res.status(201).json({ id });
};

module.exports = {
  get,
  getAll,
  remove,
  add,
  update,
};
