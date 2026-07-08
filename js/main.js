// Use `browser` when available (Firefox), otherwise fall back to `chrome` (Chrome).
var api = typeof browser !== 'undefined' ? browser : chrome;
var _links;
var body;
var timeElem;
var editSection;
var listParent;
var textarea;
var themeSelect;
var fontSelect;
var options = {
  theme: 'light',
  font: 'monospace'
};

window.addEventListener('load', init, false);

function init() {
  textarea = document.getElementById('textarea');
  body = document.getElementById('body');
  listParent = document.querySelector('.list');
  themeSelect = document.getElementById('theme');
  themeSelect.addEventListener('change', changeTheme, false);
  fontSelect = document.getElementById('font');
  fontSelect.addEventListener('change', changeFont, false);
  document.getElementById('edit-button').addEventListener('click', editLinks);

  timeElem = document.getElementById('time');
  editSection = document.getElementById('edit');
  load();

  time();
  setInterval(time, 1000);
}

function load() {
  api.storage.sync.get('links', function(item) {
    if (item.links) {
      textarea.value = item.links.trim();
    }
    parseLinks(item.links);
    _links = item.links;
  });
  api.storage.sync.get('options', function(item) {
    options = item.options || options;
    loadTheme(options.theme);
    loadFont(options.font);
  });
}

function parseLinks(links) {
  var linksArr;
  if (links) {
    linksArr = links.split('\n');
  }
  createLinks(linksArr);
}

function createLinks(linksArr) {
  var httpRegex = /^https?:\/\//;
  var urlRegex = /^\S+\.\S+/;
  var lastRowWasHeader = false;

  var list = document.createElement('ul');

  if (!linksArr || !linksArr[0]) {
    var li = document.createElement('li');
    li.innerHTML = 'Click "edit" to add links!<br><br>Use the format: example.com example<br>URL, a space, and then the title.<br><br>Use "---" to add a new column.<br>Add text without a URL to create a header.';
    list.appendChild(li);
    listParent.appendChild(list);
    return;
  }

  for (var i = 0; i < linksArr.length; i++) {
    var row = linksArr[i].trim();
    var li = document.createElement('li');

    if (row === '') {
      lastRowWasHeader = false;
      continue;
    }

    if (row === '---' || row === '===') {
      lastRowWasHeader = false;
      listParent.appendChild(list);
      list = document.createElement('ul');
      continue;
    }

    var firstWord = row.split(' ')[0];
    if (httpRegex.test(firstWord) || urlRegex.test(firstWord)) {
      var a = document.createElement('a');
      var link = firstWord;
      if (!httpRegex.test(link)) {
        link = 'https://' + link;
      }
      a.setAttribute('href', link);
      var spaceIndex = row.indexOf(' ');
      a.textContent = spaceIndex === -1 ? firstWord : row.slice(spaceIndex + 1);
      a.classList.add('button');
      li.appendChild(a);
      lastRowWasHeader = false;
    } else {
      li.textContent = row;
      if (lastRowWasHeader) {
        li.classList.add('text');
      } else {
        li.classList.add('header');
      }
      lastRowWasHeader = true;
    }
    list.appendChild(li);
  }

  listParent.appendChild(list);
}

function editLinks() {
  if (!editSection.classList.toggle('hidden')) {
    return;
  }

  var links = textarea.value.trim();
  if (links != _links) {
    api.storage.sync.set({ links: links });
    while (listParent.firstChild) listParent.removeChild(listParent.firstChild);
    load();
  }
}

function changeTheme(e) {
  loadTheme(e.target.value);
}

function loadTheme(theme) {
  options.theme = theme;
  themeSelect.value = theme;
  setBodyClass();
}

function changeFont(e) {
  loadFont(e.target.value);
}

function loadFont(font) {
  options.font = font;
  fontSelect.value = font;
  setBodyClass();
}

function setBodyClass() {
  body.setAttribute('class', options.theme + ' ' + options.font);
  api.storage.sync.set({ options: options });
}

function time() {
  var d = new Date();
  var hr = d.getHours();
  var min = d.getMinutes();

  hr = hr % 12;
  if (hr === 0) { hr = 12; }
  if (hr < 10) { hr = '0' + hr; }
  if (min < 10) { min = '0' + min; }

  timeElem.textContent = hr + ':' + min;
}
