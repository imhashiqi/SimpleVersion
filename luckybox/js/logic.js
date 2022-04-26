var mode = JSON.parse(localStorage.getItem('mode')) || 0;

var getData = function () {
  var scoures = JSON.parse(localStorage.getItem("soures")) || {};
  return scoures[mode] ||[];
};

var getAllResult = function () {
  return JSON.parse(localStorage.getItem("allResult"));
};

var config = {
  width: "100%",
  top: "",
  height: '100%'
};

var getPrice = function () {
  return getData()
    .sort((a, b) => a.id - b.id)
    .map((x) => {
      var n = {
        background: "#fff",
        borderRadius: "20px",
        imgs: [
          {
            width: config.width,
            top: config.top,
            src: x.src,
            height:config.height
          },
        ],
      };
      return n;
    });  
};

var getOrders = function () {
 return Array.from(Array(getPrice().length).keys()).sort(randomsort);   
};

function randomsort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}

// 排列
function queue(arr, size) {
  if (size > arr.length) {
    return;
  }
  var allResult = [];

  (function (arr, size, result) {
    if (result.length == size) {
      allResult.push(result);
    } else {
      for (var i = 0, len = arr.length; i < len; i++) {
        var newArr = [].concat(arr),
          curItem = newArr.splice(i, 1);
        arguments.callee(newArr, size, [].concat(result, curItem));
      }
    }
  })(arr, size, []);

  return allResult;
}

// 生排列结果
var generateQueue = function () {
  var queues = queue((getOrders() ||[]), 3) ||[];
  var data = getData();
  var result = [];

  for (var i = 0; i < queues.length; i++) {
    var current = queues[i];
    var item = {
      index: current,
      //   result: 0,
      score: 0,
    };
    for (var y = 0; y < current.length; y++) {
      var currentY = current[y];
      item.score += getScore(data, currentY) || 0;
    }
    result.push(item);
  }
  localStorage.setItem("allResult", JSON.stringify(result));
};

function getScore(data, index) {
  if (index >= data.length) console.warn("非法数据");

  return data[index]["s"];
}

var lotteryLogic = function () {
  var result = getAllResult();
  var diff = result
    .map((x) =>
      Object.assign(
        {
          result: Math.random() + x.score,
        },
        x
      )
    )
    .sort((a, b) => a.result - b.result);
  var index = diff.slice(0, 1);
  // console.log(index);
  return index[0]["index"];
};

var generateMode = function (targetDocument, callback) {
  var html = '';
  var data = JSON.parse(localStorage.getItem("soures"));
  for (var item in data) {
    var currentItems = data[item];
    if ((currentItems || []).length == 0) continue;
    html += `<button value='${item}'>${item}</button>`;
}
    targetDocument.innerHTML = html;
    var elements = targetDocument.getElementsByTagName('button');
    for(var i = 0; i < elements.length; i ++){
        var element = elements[i];
        element.onclick = callback;
    }
};

var setMode = function(val){
    localStorage.setItem('mode', JSON.stringify(val));
}
