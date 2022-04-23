let li = document.createElement("li");
let inner_box = document.querySelector('.Down-box1');
let span = document.createElement('span');
let hr = document.createElement("hr");
let del = document.createElement("button");
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
                del.innerText = "x";
                if (result == true) {
                    let new_todo_li = '<li>'+todo_value + '&nbsp' + id + `<button onclick="delete_todo(${id})" class="x-btn">X</button>` + '</li>' + '<hr>'
                    inner_box.innerHTML += new_todo_li;
                    document.querySelector(".todoValue").value = ''
                    console.log('todo value : ',todo_value)

                } else {
                    alert('fail')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const btn_outline_dark = document.querySelector(".btn-outline-dark");
btn_outline_dark.addEventListener('click', input_todo);




function delete_todo(id) {
    let todo_value = document.querySelector(".todoValue").value;
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
                alert('success');
                deleteOne(event);

            } else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
};


let event;

let deleteOne = function (event) {
    event = event;
    const removingOne = event.target.parentElement;
    removingOne.remove();
}
