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
    todo_value = document.querySelector(".todoValue").value
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
                del.innerText = "x";
                if (result == true) {
                    span.innerHTML = todo_value;
                    li.appendChild(span);
                    li.appendChild(del);
                    li.appendChild(hr);
                    inner_box.appendChild(li);
                    document.querySelector(".todoValue").value = '';
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



const delete_todo = function(event) {
    event.preventDefault();
    i_id = document.querySelector('.i-id').innerHTML;
    axios({
            url: `/todos/delete/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'id': i_id
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result == true) {
                let button = event.target;
                let li = button.parentNode;
                let inner_box = document.querySelector('.Down-box1');
                inner_box.removeChild(li); 
            } else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
};


document.querySelector('.btn_delete').addEventListener('click', delete_todo);