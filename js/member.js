var members = []

var setItems = function(name, s){
  var items = getAll();
  items.push({
    "name" : name,
    "s" : s
  });
  localStorage.setItem("members", JSON.stringify(items));
}

var getAll = function(){
  return  (JSON.parse(localStorage.getItem("members")) || []);
}

var buildItems = function(name, s = 0){
  return {
    'name' : name,
    's': s
  };
}

var saveUsers = function(value){
  if((value || '').length == 0)
    return false;

  var isSuccess = false;
  members = getAll();
  console.log(value);
  var rows = value.split('\n');
  if (rows && rows.length > 0) {
    rows.forEach(element => {
      if((element ||'').length > 0)
      {
        var rowList = element.split('&');
        var s = 0;
        var name = rowList[0].trim();
        if(members.filter((x) => x.name == name).length > 0)
        {
          Swal.fire({
            title: 'Error',
            text: `${name} exited in list`,
            icon: 'error',
            confirmButtonText: 'ok'
            });
        }
        else{                          
          if(rowList.length >=2){
              s = parseFloat(rowList[1] || 0);
          }
          members.push(buildItems(name, s));    
          isSuccess = true; 
        }
      }
    });
    // this mode do not need sorting
    // var data = JSON.stringify(members.sort((a, b) =>  b.s - a.s));
    if(isSuccess){
      localStorage.setItem("members", JSON.stringify(members));        
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    return isSuccess;
  }
}

var updateUser = function(name, s){
  if((name || '').length == 0)
    return false;
  
  if(isNaN(parseFloat(s)))
    return false;
  var isSuccess = false;
  members = getAll();
  var item = members.filter(x => x.name == name).map(x => {
    x.s = parseFloat(s)
  });
  if(item.length == 0)
  {
    Swal.fire({
      title: 'Error',
      text: `${name} not found`,
      icon: 'error',
      confirmButtonText: 'ok'
      });
  }
  else
  {
    localStorage.setItem("members", JSON.stringify(members));
    isSuccess = true;    
  }
  return isSuccess;
}