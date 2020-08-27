import $ from "jquery";
import {STORE} from "./store.js";
import {generateForm, generateTextField, generateButton} from "./generateForm.js";

export function init() 
{
    //DisplayHello();
    renderHeader();
    renderForm();
    loadBookmarkList();
}
/*export function DisplayHello() {
    console.log('hello');
    console.log(STORE);
    console.log(generateForm());
}*/
const rootStyle = 
{
    "display": "grid",
    "grid-template-rows": "100px 700px",
    "grid-gap": "5px",
    "width": "100%",
    "height": "100%"
}

let renderHeader = () => {
    $("#root").append(`
    <header>Bookmark Application</header>
    `)
}

let renderForm = () =>
{
    $("#root").append(`<div class="formComponent"><form action="" method="get" id="addBookmarkForm">
    ${generateTextField("Enter title ", "bookmarkTitle")}
    <br>
    ${generateTextField("Enter URL ", "urlDescription")}
    <br>
    ${generateButton("Add Bookmark", "addBookmark")}
    </form>
    <div id="bookmarkList">
    <ul></ul></div>
    </div>
    `);
    //Form event 
    $("#addBookmarkForm").submit(submitEvent)
    //Style form
    $("#root").css(rootStyle);
    //$(".formComponent").css(formStyle);
}

let submitEvent = (evt)=>{
    evt.preventDefault();
    console.log("Form clicked!");
    let fields = $( ":input" ).serializeArray();
    const object = {
        title: fields[0]["value"],
        url: fields[1]["value"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor felis ac ante tincidunt, nec mattis ante vestibulum. Morbi et arcu eu odio tincidunt feugiat nec sit amet libero. Proin justo nibh, dignissim eu tincidunt porttitor, placerat nec magna. Sed dui leo, sodales a pellentesque a, fermentum tempor mauris. Etiam ac posuere velit, ac euismod risus. Sed libero ante, eleifend laoreet enim eu, consequat egestas elit. Aliquam eget lacus eget ante sollicitudin bibendum sit amet vitae sapien. Etiam congue interdum blandit. Vestibulum ut nulla nisl. Nulla tristique at libero et rutrum. Aliquam in tortor in quam cursus aliquam. Donec ultrices lectus ac molestie dictum. Ut sodales metus in risus varius fermentum."
    }
    STORE.push(object);
    clearBookmarkList();
    loadBookmarkList();
}

let loadBookmarkList = () => {
    STORE.forEach((bookmark)=> {
        $("#bookmarkList ul").append(
            `<li><h2>${bookmark.title}<h2></li>
            <li><i>${bookmark.url}</i></li>
            <li><p>${bookmark.description}</p></li>`
        )
    })
}

let clearBookmarkList = () => 
{
    $("#bookmarkList ul").html("");
}