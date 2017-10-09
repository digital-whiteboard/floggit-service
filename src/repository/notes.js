const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const notes = (localStorage.getItem('noteList')) ?
  JSON.parse(localStorage.getItem('noteList')) : {};

function generateId() {
  return (+(new Date())).toString(); // Use a GUID generator instead of this
}

function save() {
  localStorage.setItem('noteList', JSON.stringify(notes));
}

const publicAPI = {};

publicAPI.add = (value) => {
  const uniqueId = generateId();
  notes[uniqueId] = {
    value,
  };
  save();
  return uniqueId;
};

publicAPI.get = id => notes[id];

publicAPI.remove = (id) => {
  delete notes[id];
  save();
};

publicAPI.getAll = () => {
  const notesArray = [];
  Object.keys(notes).forEach((id) => {
    notesArray.push({
      id,
      value: notes[id].value,
    });
  });
  return notesArray;
};

publicAPI.update = (id, value) => {
  delete notes[id].value;
  notes[id] = {
    value,
  };
  save();
  return value;
};

module.exports = publicAPI;
