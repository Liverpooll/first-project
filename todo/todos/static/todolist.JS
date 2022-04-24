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

const input_todo = function(event) {
    event.preventDefault();
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
                    let new_todo_li = '<li>' + todo_value + '&nbsp' + id + `<button onclick="edit_todo(${id}, event)" class="m-btn">M</button>` + `<button style="display:inline-block" onclick="delete_todo(${id}, event)" class="x-btn">X</button>` + '</li>'
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

const btn_outline_dark = document.querySelector(".btn-outline-dark");
btn_outline_dark.addEventListener('click', input_todo);


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


function edit_todo(id, event) { 
    let todo_value = document.querySelector(".todo_list");
    axios({
            url: `/todos/edit/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'todo': todo_value,
                'id': id,
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result === true) {
                alert('success');



            } else {
                alert('fail');
            }
        })
        .catch((error) => {
            console.log(error);
        })
};


