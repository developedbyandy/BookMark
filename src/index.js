import $ from 'jquery';
//import bookmarks from './store';
import cuid from 'cuid';
const urlEndpoint = "https://thinkful-list-api.herokuapp.com/andycharles/bookmarks";
//Add bookmarks to my bookmark list
//I can see a list of my bookmarks
//I can click on a bookmark to display the detailed view
//I can remove bookmarks from my bookmark list
// I receive appropriate server feedback when I cannot add/update a bookmark
//I can select froma dropdown a "minimum rating" to filter the list by all bookmarks
//rated equal or above the chosen selection

export function init() {
  loadBookMarks();
}



function main() {
  console.log('DOM is loaded');
  //console.log(bookmarks);
  const startMsg = $('<p>BOOKMARKS!</p>');
  $('#root').append(startMsg);
  $("#js-bookmark-form").submit(function (event) {
    event.preventDefault();
    let bookmarkEntry = $("#bookmark-entry").val();
    let bookmarkUrl = $('#bookmark-url').val();
    let bookmarkRating = $("input[name='rating']:checked").val();
    let newBookmark = {
      'id': cuid(),
      'title': bookmarkEntry,
      'url': bookmarkUrl,
      'rating': bookmarkRating
    }
    addBookmark(newBookmark)
    clearBookmarkList()
    //setTimeout(function(){ loadBookMarks(); }, 1000);
    console.log('test');
  });
  //loadBookMarks();
}

let loadBookMarks = function () {
  fetch(urlEndpoint, { method: 'GET' })
    .then(res => res.json())
    .then(json => {
      const bookmarks = json;
      console.log(bookmarks);
      //clearBookmarkList();
      bookmarks.forEach((bookmark) => {
        $("#bookmarkList > ul").append(
          `<div id="${bookmark.id}"><li><h2>${bookmark.title}<h2></li>
          <li><i>${bookmark.description}</i></li>
          <li><p>${bookmark.url}</p></li>
          <li><p>${bookmark.rating} <i class="fas fa-star"></i></p></li>
          <li><button id="view${bookmark.id}">Click to view detail</button><button id="remove${bookmark.id}">Remove</button></li>
         </div>`
        );
        $(`#remove${bookmark.id}`).click(() => {
          const id = $(event.currentTarget).attr('id').split("remove")[1];
          deleteBookmark(id);
          setTimeout(() => { location.reload() }, 1000);

        })
        $(`#view${bookmark.id}`).click(() => {
          const id = $(event.currentTarget).attr('id').split("view")[1];
          viewBookmark(id);



        })
      })

    })
}

let addBookmark = function (bookmark) {
  //console.log(JSON.stringify(bookmark));

  fetch(urlEndpoint, {
    method: 'post', body: JSON.stringify(bookmark), headers: { 'Content-Type': 'application/json' },
  })

    .then(res => res.json())
    .then(json => {
      $("#msg").html("Bookmark added!");
      setTimeout(() => { location.reload() }, 1000);
    });

}

let clearBookmarkList = function () {
  $('#bookmarkList').html('');
}

let deleteBookmark = function (id) {
  fetch(urlEndpoint + "/" + id, {
    method: 'delete',
  })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      $("#msg").html("Bookmark deleted!");
      clearBookmarkList()

    });

}

let viewBookmark = function (id) {
  fetch(urlEndpoint + "/" + id, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      let myData = JSON.parse(JSON.stringify(json));
      console.log(myData.title)
      let renderedData = `Title: ${myData.title} <br>
      Url: ${myData.url} <br>
      Description: ${myData.desc}<br>
      Rating: ${myData.rating}`;
      $("#msg").html(renderedData);
  });
 
}

$(main);


