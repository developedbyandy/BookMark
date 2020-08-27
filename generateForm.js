

export let generateTextField = (label, id) => {
    let textField = `<input type="text" id="${id}" name="${id}">`;
   return `
   <div class = "fieldClass">
   <label for="${id}">${label} </label>
   ${textField}
   </div>
   `
}

export let generateButton = (text, id) => {
   let button = `<center><button type="submit" id="${id}" name="${id}"> ${text} </button></center>`;
   return button;
}

