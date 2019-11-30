for (var i = 0; i < 6; i++) {
  var row = document.querySelector("table").insertRow(-1);
  for (var j = 0; j < 6; j++) {
    var letter = String.fromCharCode("A".charCodeAt(0) + j - 1);
    row.insertCell(-1).innerHTML =
      i && j ? "<input id='" + letter + i + "'/>" : i || letter;
  }
}
function appendRow() {
  var tbl = document.getElementById("table"),
    row = tbl.insertRow(tbl.rows.length);

  for (i = 0; i < tbl.rows[0].cells.length; i++) {
    createCell(row.insertCell(i), i, "row");
  }
}
function createCell(cell, text, style) {
  var div = document.createElement("div"),
    txt = document.createElement("input");
  txt.type = "text";
  div.appendChild(txt);
  div.setAttribute("class", style);
  div.setAttribute("className", style);
  cell.appendChild(div);
}
function appendColumn() {
  var tbl = document.getElementById("table"),
    i;
  for (i = 0; i < tbl.rows.length; i++) {
    createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i, "col");
  }
}
function deleteRows() {
  var tbl = document.getElementById("table"),
    lastRow = tbl.rows.length - 1,
    i;
  for (i = lastRow; i > 0; i--) {
    tbl.deleteRow(i);
  }
}

function deleteColumns() {
  var tbl = document.getElementById("table"),
    lastCol = tbl.rows[0].cells.length - 1,
    i,
    j;
  for (i = 0; i < tbl.rows.length; i++) {
    for (j = lastCol; j > 0; j--) {
      tbl.rows[i].deleteCell(j);
    }
  }
}

var DATA = {},
  INPUTS = [].slice.call(document.querySelectorAll("input"));
INPUTS.forEach(function(elm) {
  elm.onfocus = function(e) {
    e.target.value = localStorage[e.target.id] || "";
  };
  elm.onblur = function(e) {
    localStorage[e.target.id] = e.target.value;
    computeAll();
  };
  var getter = function() {
    var value = localStorage[elm.id] || "";
    if (value.charAt(0) == "=") {
      with (DATA) return eval(value.substring(1));
    } else {
      return isNaN(parseFloat(value)) ? value : parseFloat(value);
    }
  };
  Object.defineProperty(DATA, elm.id, { get: getter });
  Object.defineProperty(DATA, elm.id.toLowerCase(), { get: getter });
});
(window.computeAll = function() {
  INPUTS.forEach(function(elm) {
    try {
      elm.value = DATA[elm.id];
    } catch (e) {}
  });
})();
