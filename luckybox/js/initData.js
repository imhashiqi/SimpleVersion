var initList = [
  {
    "id": 2,
    "name": "apple",
    "src": "images/apple.png",
    "sort": 1,
    "group": "1",
    "s": 0
  },
  {
    "id": 3,
    "name": "banana",
    "src": "images/banana.png",
    "sort": 2,
    "group": "1",
    "s": 0
  },
  {
    "id": 4,
    "name": "camera",
    "src": "images/camera.png",
    "sort": 3,
    "group": "1",
    "s": 0.3
  },
  {
    "id": 5,
    "name": "gift",
    "src": "images/gift.png",
    "sort": 1,
    "group": "1",
    "s": 0.5
  },
  {
    "id": 6,
    "name": "phone",
    "src": "images/phone.png",
    "sort": 5,
    "group": "1",
    "s": 1
  },
  {
    "id": 7,
    "name": "money",
    "src": "images/money_bag.png",
    "sort": 6,
    "group": "1",
    "s": 0.2
  },
  {
    "id": 8,
    "name": "Desktop",
    "src": "images/Desktop.png",
    "sort": 7,
    "group": "1",
    "s": 0.4
  },
  {
    "id": 9,
    "name": "eglass-glass",
    "src": "images/eglass-glass.png",
    "sort": 8,
    "group": "1",
    "s": 0
  },
  {
    "id": 10,
    "name": "active",
    "src": "images/active.png",
    "sort": 9,
    "group": "1",
    "s": 0
  },
  {
    "id": 11,
    "name": "lucky record",
    "src": "images/lucky record.png",
    "sort": 10,
    "group": "1",
    "s": 0
  },
  {
    "id": 12,
    "name": "prize",
    "src": "images/prize.png",
    "sort": 11,
    "group": "1",
    "s": 0
  }
];

var intSoures =
{"0":[],"1":[{"id":2,"name":"apple","src":"images/apple.png","sort":1,"group":"1","s":0},{"id":3,"name":"banana","src":"images/banana.png","sort":2,"group":"1","s":0},{"id":4,"name":"camera","src":"images/camera.png","sort":3,"group":"1","s":0.3},{"id":5,"name":"gift","src":"images/gift.png","sort":1,"group":"1","s":0.5},{"id":6,"name":"phone","src":"images/phone.png","sort":5,"group":"1","s":1},{"id":7,"name":"money","src":"images/money_bag.png","sort":6,"group":"1","s":0.2},{"id":8,"name":"Desktop","src":"images/Desktop.png","sort":7,"group":"1","s":0.4},{"id":9,"name":"eglass-glass","src":"images/eglass-glass.png","sort":8,"group":"1","s":0},{"id":10,"name":"active","src":"images/active.png","sort":9,"group":"1","s":0},{"id":11,"name":"lucky record","src":"images/lucky record.png","sort":10,"group":"1","s":0},{"id":12,"name":"prize","src":"images/prize.png","sort":11,"group":"1","s":0}]}

var initId = 13;

function initData(){
    localStorage.setItem('list', JSON.stringify(initList));
    localStorage.setItem('soures', JSON.stringify(intSoures));
    localStorage.setItem('id', JSON.stringify(initId));
}