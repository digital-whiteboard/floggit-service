const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const titles = (localStorage.getItem('noteTitles')) ?
  JSON.parse(localStorage.getItem('noteTitles')) : {};

function generateId() {
  return (+(new Date())).toString(); // Use a GUID generator instead of this
}

function save() {
  localStorage.setItem('noteTitles', JSON.stringify(titles));
}

const publicAPI = {};

publicAPI.add = (value) => {
  const uniqueId = generateId();
  titles[uniqueId] = {
    value,
  };
  save();
  return uniqueId;
};

publicAPI.get = id => titles[id];

publicAPI.remove = (id) => {
  delete titles[id];
  save();
};

publicAPI.getAll = () => {
  const titlesArray = [];
  Object.keys(titles).forEach((id) => {
    titlesArray.push({
      id,
      value: titles[id].value,
    });
  });
  return titlesArray;
};

publicAPI.update = (id, newValue) => {
  const titleForUpdate = titles[id];
  titles.pop(titleForUpdate);
  titles[id] = {
    newValue,
  };
  save();
  return titles;
};

module.exports = publicAPI;
