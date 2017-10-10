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
  const note = req.body;
  const id = notes.add(note);
  res.status(201).json({ id });
};

const update = (req, res) => {
  const id = req.params.id;
  const note = notes.get(id);
  const newNote = req.body;
  notes.remove(note);
  notes.update(id, newNote);
  res.status(201).json({ id });
};

module.exports = {
  get,
  getAll,
  remove,
  add,
  update,
};
