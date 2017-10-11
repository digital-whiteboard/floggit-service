const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const notes = (localStorage.getItem('notes')) ?
  JSON.parse(localStorage.getItem('notes')) : {};

function generateId() {
  return (+(new Date())).toString();
}

function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

const publicAPI = {};

publicAPI.add = (title, noteList, color) => {
  const uniqueId = generateId();
  notes[uniqueId] = {
    title,
    noteList,
    color,
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
      title: notes[id].title,
      noteList: notes[id].noteList,
      color: notes[id].color,
    });
  });
  return notesArray;
};

publicAPI.update = (id, title, noteList, color) => {
  notes[id] = {
    title,
    noteList,
    color,
  };
  save();
};

module.exports = publicAPI;
