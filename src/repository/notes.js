const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const notes = (localStorage.getItem('notes')) ?
  JSON.parse(localStorage.getItem('notes')) : {};

function generateId() {
  return (+(new Date())).toString(); // Use a GUID generator instead of this
}

function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

const publicAPI = {};

publicAPI.add = (obj) => {
  const uniqueId = generateId();
  notes[uniqueId] = obj;
  save();
  return uniqueId;
};

publicAPI.get = id => Object.assign({}, notes[id], { id });

publicAPI.remove = (id) => {
  delete notes[id];
  save();
};

publicAPI.getAll = () => {
  const notesArray = [];
  Object.keys(notes).forEach((id) => {
    notesArray.push({
      id,
      obj: notes[id].obj,
    });
  });
  return notesArray;
};

publicAPI.update = (id, obj) => {
  delete notes[id].obj;
  notes[id] = obj;
  save();
  return obj;
};

module.exports = publicAPI;
