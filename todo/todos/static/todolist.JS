let li = document.createElement("li");
let inner_box = document.querySelector('.Down-box1');
let del = document.createElement("button");
let edit = document.createElement("button");

let List = [];



function getCsrfToken() {
    return document.cookie.split(';')
        .find((item) => item.includes('csrftoken'))
        .split('=')[1];
}

// Create

document.querySelector('.todoValue').addEventListener('keyup', (e)=>{
    if (e.keyCode === 13) {
        create_todo();
  }  
});


const create_todo = function(event) {
    // event.preventDefault();
    let todo_value = document.querySelector(".todoValue").value;
    if (todo_value == '') {
        alert('뭐라도 입력해봐');
    } else {
        axios({
                url: `/todos/create/`,
                method: 'post',
                headers: {
                    "content-type": "application/json",
                    'X-CSRFToken': getCsrfToken(),
                },
                data: {
                    'todo': todo_value,
                },
            })
            .then(function(response) {
                let result = response.data['is_success']
                let id = response.data['id'];
                if (result == true) {
                    let new_todo_li = `<li> 
                    <div class=todo_list_div value=${todo_value} onclick="edit_todo(${id}, event)"> 
                    ${todo_value} 
                    </div> &nbsp <button onclick="delete_todo(${id}, event)"
                     class="btn_delete">X</button></li>`
                    inner_box.innerHTML += new_todo_li;
                    document.querySelector(".todoValue").value = null;

                } else {
                    alert('fail');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
// Create


const btn_outline_dark = document.querySelector(".btn-outline-dark");
btn_outline_dark.addEventListener('click', create_todo);



// delete
function delete_todo(id, event) { 

        axios({
            url: `/todos/delete/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'id': id,
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result === true) {
                const removingOne = event.target.parentElement;
                removingOne.remove();

            } else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
};
// delete
let event_value = ''
// edit 수정!
function edit_todo(id, event) {
    event_value = event.target; 
    let content = event.target;
    axios({
            url: `/todos/edit/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'todo': content.innerHTML,
                'id': id,
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result === true) {
                real_edit(content, event);
      
            } else {
                alert('fail');
            }
        })
        .catch((error) => {
            console.log(error);
        })
};
// edit

// real_edit
let real_edit = function(content, id, event) {
    console.log(content.innerHTML);
    let new_todo_input = `<input type="text" class="new_todo_input" placeholder="${content.innerHTML}"></input>`
    content.innerHTML = new_todo_input;
    $('.new_todo_input').keydown((key) => {
        if (key.keyCode === 13) {
            let new_todo_value = $(".new_todo_input").val();
            let new_todo_li = `
            <p class="todo_list_div" value=${new_todo_value} onclick="input_todo(${id}, event)"> 
            ${new_todo_value}
            </p>`
            if (new_todo_value == '') {
                alert('최소 1자 이상 입력해주세요')
            } else {
                content.innerHTML = new_todo_li;
            }
        }
    });
}