'use strict';

let create = document.querySelector('.btn');
let edit = document.querySelector('.btn_edit');
let del = document.querySelector('.btn_delete');
const inner_box = document.querySelector('.Down-box1');

function getCsrfToken() {
    return document.cookie.split(';')
        .find((item) => item.includes('csrftoken'))
        .split('=')[1];
}

document.querySelector('.todoValue').addEventListener('keyup', (e, event) => {
    if (e.keyCode === 13) {
        create_todo(event);
    }
});


function create_todo() {
    // 1. 적은 값의 정보를 받기
    // 2. 받은 정보를 비동기 통신으로 데이터 저장하게 하기.
    // 3. 비동기 통신이 성공하면 노드 추가하기
    // 4. 실패하면 추가 안함
    let todo_value = $(".todoValue").val();

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
                    const node_list = document.querySelectorAll('.todo_list_li');
                    const li = document.createElement("li");
                    const button = document.createElement("button");
                    const button_1 = document.createElement("button");
                    const div = document.createElement("div");
                    li.classList.add('todo_list_li');
                    div.id = node_list.length;
                    div.classList.add('todo_list_div');
                    div.innerHTML = todo_value;
                    button.innerHTML = 'M';
                    button.setAttribute("onclick", `change_input_onclick(${id}, event)`);
                    button.classList.add('btn_edit');
                    button.value = node_list.length;

                    button_1.innerHTML = 'X';
                    button_1.setAttribute("onclick", `delete_onclick(${id}, event)`);
                    button_1.classList.add('btn_delete');
                    button_1.value = node_list.length;

                    li.appendChild(div);
                
                    li.appendChild(button);
                    li.appendChild(button_1);
                    inner_box.appendChild(li);


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

let test_event = ''

// 체인지 인풋 온클릭 함수에서 누는 수정완료 버튼이 클릭 됐을 때 연결되는 함수
function edit_success_onclick(id, event) {
    test_event = event;
    // 1. 해당 노드의 정보 받기
    // 2. 비동기 통신 보내기.
    // 3. 성공하면 크리에이트 함수 동작 할 때의 노드 상태와 똑같이 바꾸기.
    // 4. 실패하면 안되게 하기
    const node_id = event.target.value;
    const content = document.querySelector('.new_input').value;
    axios({
            url: `/todos/edit/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'todo': content,
                'id': id,
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result === true) {

                const button_2 = document.querySelectorAll('.new_button')[node_id]
                const list_id = document.querySelectorAll('.todo_list_div')[node_id];
                // const todo_list1 = document.querySelectorAll('.todo_list')[node_id];
                const todo_list = document.querySelectorAll('.todo_list')[node_id];
                const node_list = document.querySelector('.todo_list_div');
                const button = document.createElement("button");
                const new_input = document.querySelector('.new_input');
                const button_1 = document.querySelectorAll('.btn_delete')[node_id];
                const div = document.createElement('div');
                
                div.id = node_id;
                div.classList.add('todo_list_div')
                div.innerHTML = content;
                button.innerHTML = 'M';
                button.classList.add('btn_edit');
                button.value = node_id;
                button.setAttribute("onclick", `change_input_onclick(${id}, event)`)

                // todo_list.removeChild(todo_list.childNodes[0]);
                // console.log()
                // todo_list.removeChild(todo_list.childNodes[1]);



            } else {
                alert('fail');
            }
        })
        .catch((error) => {
            console.log(error);
        })

}


function change_input_onclick(id, event) {
    test_event = event;

    // 1. 해당 노드의 정보 받기.
    // 2. 그 노드를 인풋 텍스트로 바꾸기
    // 3. 버튼도 이제 수정완료로 바꾸기. !! 온클릭 이벤트 제대로 연결줘야함
    const node_id = event.target.value;
    console.log(node_id)
    const node_list = document.querySelectorAll('.todo_list_li');
    // console.log(node_list)
    const list_div = document.querySelectorAll('.todo_list_div')[node_id];
    // console.log(list_div)
    const todo_list = document.querySelectorAll('.todo_list_li')[node_id];
    // console.log(todo_list);
    const new_input = document.createElement('input');
    const button_2 = document.createElement('button');

    const button = document.querySelectorAll('.btn_edit')[node_id - 1];
    console.log(button);


    
    new_input.type = 'text';
    new_input.placeholder = list_div.innerHTML;
    new_input.id = node_id ;
    new_input.classList.add('new_input');
    new_input.classList.add('todo_list_div');
    button_2.type = 'button';
    button_2.innerText = '수정!';
    button_2.value = node_id;
    button_2.classList.add('new_button');
    button_2.setAttribute("onclick", `edit_success_onclick(${id}, event)`)

    

    console.log(button_2);
    todo_list.replaceChild(new_input, list_div);
    todo_list.replaceChild(button_2, button);
    // todo_list.removeChild(list_div);
    // todo_list.removeChild(button);
    // todo_list.removeChild(button_1);
    // todo_list.appendChild(new_input);
    // todo_list.appendChild(button_2);
    // todo_list.appendChild(button_1);




    $('.new_input').keydown((key) => {
        if (key.keyCode === 13) {
            edit_success_onclick(id, event);
        }
    });

    // input text change
}




function delete_onclick(id, event) {
    // 1. 해당 노드의 정보 받기
    // 2. 비동기 통신 보내기
    // 3. 성공하면 해당 노드 지우기.
    //4. 실패하면 안되게 하기
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
}