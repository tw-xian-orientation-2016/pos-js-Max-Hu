//TODO: Please write code in this file.
function countNumber(code) {
  var map = {};
  for (var i = 0; i < code.length; i++) {
    var array = code[i].split("-")
    if (array.length === 2) {
      map[array[0]] = parseInt(array[1]);
    }else {
      if (map[array[0]] != undefined) {
        map[array[0]] += 1;
      }else {
        map[array[0]] = 1;
      }
    }
  }
  return map;
}
