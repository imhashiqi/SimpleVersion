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
            return false;
        }                               
        if(rowList.length >=2){
            s = parseFloat(rowList[1] || 0);
        }
        members.push(buildItems(name, s));     
      }
    });
    // this mode do not need sorting
    // var data = JSON.stringify(members.sort((a, b) =>  b.s - a.s));
    localStorage.setItem("members", JSON.stringify(members));        
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
}