'use strict'
document.addEventListener("DOMContentLoaded", function() { 
// LIST 
    var dataitems = [];
    var list = document.getElementById("list");
    var namefilter = document.getElementById("name");
    var typefilter = document.getElementById("type");

    var getdata = loading('data.json',
        function(data) { 
            
            data.forEach(function(element) {
                dataitems.push(element);
                sorting_by_type(dataitems);
                filtering(dataitems);   
              });
        },
    function(xhr) { console.log(xhr); /* in case of error */ }
    );


    function loading (path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };

    xhr.open("GET", path, true);
    xhr.send();
    
}

    function sorting_by_name (array) {
        array.sort(function(a, b) {
            return a.nodename[a.nodename.length -1] - b.nodename[b.nodename.length -1];
        });
}

    function sorting_by_type (array) {
        array.sort(function(a, b) {
            return a.nodetype.length - b.nodetype.length;
        });
}

    function filtering (array) {
        list.innerHTML = "";
        array.forEach(function (element) {
        
        list.innerHTML += "<li> Type " + element.nodetype + ", Name:" + element.nodename + ", Time: " + element.datetime + "</li>";
      
        });
    }

    namefilter.onclick = function () {
        sorting_by_name(dataitems);
        filtering(dataitems);
    }
    typefilter.onclick = function () {
        sorting_by_type(dataitems);
        filtering(dataitems);
    }

//FORM 
    var testForm = document.getElementById('test-form');
    var demo = document.getElementById("demo");
    testForm.onsubmit = function(event) {
        demo.innerHTML = "";
      event.preventDefault();

      var request = new XMLHttpRequest();
      // POST to a file which returns the POST data as JSON
      request.open('POST', '#', /* async = */ true);
  
      var formData = new FormData(testForm);
      request.send(formData);
      
      formData.forEach(function (item) {

          

          if (typeof item === "object") { // showing the file name
            demo.innerHTML += item.name + "<br>";
            
          } else {
            demo.innerHTML += item + "<br>";
          } 

      });
      var e = document.getElementById("dropdown");
          var strUser = e.options[e.selectedIndex].value;
          demo.innerHTML += "Selected dropdown: " + strUser + "<br>";
    }


});
