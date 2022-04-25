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

var getAllResult = function () {
  return JSON.parse(localStorage.getItem("allResult")) || [];
};

var defaultPath = "images/";
var addItem = function (name, path, group, s = 0) {
  var isSucess = false;
  if ((name || "").length == 0) {
    warnAlert("name no allow empty");
    return false;
  }
  if ((path || "").length == 0) {
    warnAlert("imagePath no allow empty");
    return false;
  }
  var soures = getAllData();
  var data = soures[group || 0] || [];
  var item = data.filter((x) => x.name == name);
  if (item.length > 0) {
    warnAlert(`${name} is exited`);
    return false;
  }
  s = isNaN(parseFloat(s)) ? 0 : parseFloat(s);

  var item = buildItem(name, defaultPath + path, group, s);
  data.push(item);
  soures[group || 0] = data;

  var list = getList();
  list.push(item);
  localStorage.setItem("soures", JSON.stringify(soures));
  localStorage.setItem("list", JSON.stringify(list));
  insId();
  isSucess = true;
  return isSucess;
};

var updateItem = function (id, s, group) {
  var isSucess = false;
  if ((id || "").length == 0) {
    warnAlert("id no allow null");
    return false;
  }
  s = isNaN(parseFloat(s)) ? 0 : parseFloat(s);

  var scoures = getAllData();
  var data = scoures[group || 0] || [];
  if (data.length == 0) {
    warnAlert("no data can be modify, please refesh page and try again");
    return false;
  }
  var thisSuccess = false;
  var targetIndex, targetItem;
  for(var i = 0; i < data.length; i ++){
    var thisItem = data[i];
    if(thisItem.id != id)
      continue;
    
    targetIndex = i;
    targetItem = thisItem;
    thisItem['s'] = isNaN(parseFloat(s)) ? 0 : parseFloat(s);
    data[i] = thisItem;
    thisSuccess = true;
  }
  // var item = data.filter((x) => x.id == id);
  if (!thisSuccess) {
    warnAlert(`no found id[${id}], please refesh page and try again`);
    return false;
  }
  scoures[group || 0] = data;
  var list = getList();
  for(var i = 0; i < list.length; i ++){
    var thisItem = list[i];
    if(thisItem['id'] != id)
      continue;
    
    list[i] = targetItem;
    break;
  }
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("soures", JSON.stringify(scoures));
  updateS(targetIndex, data);
  isSucess = true;
  return isSucess;
};

function updateS(index, data){
  var allResult = getAllResult();
  for(var i = 0; i < allResult.length; i ++){
    var currentItem = allResult[i];
    if((currentItem['index'] ||[]).includes(index)){
      currentItem['score'] = 0;
      for(var y = 0; y < currentItem['index'].length; y ++){
        var thisIndex = currentItem['index'][y];
        currentItem['score'] += data[thisIndex]['s'];
      }
      allResult[i] = currentItem;
    }
  }
  localStorage.setItem('allResult', JSON.stringify(allResult));
}

var deleteItem = function (id, group) {
  var isSucess = false;
  if ((id || "").length == 0) {
    warnAlert("id no allow null");
    return false;
  }

  var sources = getAllData();
  var data = sources[group || 0] || [];
  if (data.length == 0) {
    warnAlert("no data can be modify, please refesh page and try again");
    return false;
  }
  var item = data.filter((x) => x.id == id);
  if (item.length == 0) {
    warnAlert(`no found id[${id}], please refesh page and try again`);
    return false;
  }

  data = data.filter((x) => x.id != id);
  sources[group || 0] = data;
  var list = getList().filter((x) => x.id != id);  
  localStorage.setItem("list", JSON.stringify(list));
  localStorage.setItem("soures", JSON.stringify(sources));
  isSucess = true;
  return isSucess;
};

var buildItem = function (name, path, group, s) {
  var id = getId();
  return {
    id: id,
    name: name,
    src: path,
    group: group || 0,
    s: s,
  };
};

function warnAlert(msg, time = 3000){
  layer.alert(msg
    ,  {
      time : time,
      btn : ['Ok'],
      title: 'Warn'
    });
}
