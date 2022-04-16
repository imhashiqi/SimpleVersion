var data = [
  {
    id: "",
    src: "",
    name: "a",
    sort: 1,
    s: 0,
  },
  {
    id: "",
    src: "",
    name: "b",
    sort: 1,
    s: 0,
  },
  {
    id: "",
    src: "",
    name: "c",
    sort: 1,
    s: 0,
  },
  {
    id: "",
    src: "",
    name: "a",
    sort: 1,
    s: 0,
  },
  {
    id: "",
    src: "",
    name: "a",
    sort: 1,
    s: 0,
  },
];

var getId = function () {
  var id = JSON.parse(localStorage.getItem("id")) || 1;
  return id;
};

var insId = function () {
  var id = getId();
  id++;
  localStorage.setItem("id", id);
};

var getAllData = function () {
  return JSON.parse(localStorage.getItem("soures")) || {};
};

var getList = function () {
  return JSON.parse(localStorage.getItem("list")) || [];
};

var defaultPath = "images/";
var addItem = function (name, path, sort, group, s = 0) {
  var isSucess = false;
  if ((name || "").length == 0) {
    layer.alert("name no allow empty", 2000);
    return false;
  }
  if ((path || "").length == 0) {
    layer.alert("imagePath no allow empty", 2000);
    return false;
  }
  var soures = getAllData();
  var data = soures[group || 0] || [];
  var item = data.filter((x) => x.name == name);
  if (item.length > 0) {
    layer.alert(`${name} is exited`, 2000);
    return false;
  }
  s = isNaN(parseFloat(s)) ? 0 : parseFloat(s);

  var item = buildItem(name, defaultPath + path, sort, group, s);
  data.push(item);
  soures[group || 0] = data;

  var list = getList();
  list = data;
  localStorage.setItem("soures", JSON.stringify(soures));
  localStorage.setItem("list", JSON.stringify(list));
  insId();
  isSucess = true;
  return isSucess;
};

var updateItem = function (id, s, group) {
  var isSucess = false;
  if ((id || "").length == 0) {
    layer.alert("id no allow null", 2000);
    return false;
  }
  s = isNaN(parseFloat(s)) ? 0 : parseFloat(s);

  var scoures = getAllData();
  var data = scoures[group || 0] || [];
  if (data.length == 0) {
    layer.alert(
      "no data can be modify, please refesh page and try again",
      2000
    );
    return false;
  }
  var item = data.filter((x) => x.id == id);
  if (item.length == 0) {
    layer.alert(`no found id[${id}], please refesh page and try again`, 2000);
    return false;
  }

  item[0]["s"] = isNaN(parseFloat(s)) ? 0 : parseFloat(s);
  data = data.filter((x) => x.id != id);
  data.push(item[0]);
  var list = getList();
  list = data;
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("soures", JSON.stringify(scoures));
  isSucess = true;
  return isSucess;
};

var deleteItem = function (id, group) {
  var isSucess = false;
  if ((id || "").length == 0) {
    layer.alert("id no allow null", 2000);
    return false;
  }

  var sources = getAllData();
  var data = sources[group || 0] || [];
  if (data.length == 0) {
    layer.alert(
      "no data can be modify, please refesh page and try again",
      2000
    );
    return false;
  }
  var item = data.filter((x) => x.id == id);
  if (item.length == 0) {
    layer.alert(`no found id[${id}], please refesh page and try again`, 2000);
    return false;
  }

  data = data.filter((x) => x.id != id);
  sources[group || 0] = data;
  var list = getList();
  list = data;
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("soures", JSON.stringify(sources));
  isSucess = true;
  return isSucess;
};

var buildItem = function (name, path, sort, group, s) {
  var id = getId();
  return {
    id: id,
    name: name,
    src: path,
    sort: isNaN(parseInt(sort)) ? 0 : parseInt(sort),
    group: group || 0,
    s: s,
  };
};

