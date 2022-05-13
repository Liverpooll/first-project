'use strict';

const form_box = document.querySelector('.form-box');
const todo_input = document.querySelector('.todoValue');
const submit_btn = document.querySelector('.btn-outline-dark');
const inner_box = document.querySelector('.Down-box1');
const nbsp = '&nbsp'


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


function create_todo(id) {
    // 1. 적은 값의 정보를 받기
    // 2. 받은 정보를 비동기 통신으로 데이터 저장하게 하기.
    // 3. 비동기 통신이 성공하면 노드 추가하기
    // 4. 실패하면 추가 안함

    if (todo_input.value == '') {
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
                    'todo': todo_input.value,
                },
            })
            .then(function(response) {
                let result = response.data['is_success']
                let id = response.data['id'];

                if (result == true) {
                    let li = document.createElement('li');
                    let span = document.createElement('span');
                    let X_button = document.createElement('input');
                    let radio = document.createElement('input');


                    radio.type = 'checkbox';
                    radio.setAttribute('onclick', `done_onclick(${id},event)`);
                    radio.classList.add('btn_done');
                    radio.style.marginTop = "17px"

                    span.innerText = todo_input.value;
                    span.style.cursor = "pointer"
                    span.style.marginLeft = "11px"
                    span.setAttribute("onclick", `change_input_onclick(${id}, event)`);
                    span.style.fontSize = "13px"
                    li.classList.add('todo_list_li');


                    X_button.innerText = 'X';
                    X_button.type = 'button';
                    X_button.value = 'X';
                    X_button.setAttribute("onclick", `delete_onclick(${id}, event)`);
                    X_button.classList.add('btn_delete');

                    li.appendChild(radio);
                    li.appendChild(span);
                    li.appendChild(X_button);

                    inner_box.appendChild(li);

                    todo_input.value = null;


                } else {
                    alert('fail');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}



// 체인지 인풋 온클릭 함수에서 누는 수정완료 버튼이 클릭 됐을 때 연결되는 함수
function edit_success_onclick(id, event) {


    let new_input = document.querySelector('.new_input');
    let event_parent = event.target.parentElement;
    let secondNode = event_parent.children[1];
    let thirdNode = event_parent.children[2];

    let span = document.createElement('span');
    let radio = document.createElement('input');



    radio.type = 'checkbox';
    radio.setAttribute('onclick', `done_onclick(${id},event)`);
    radio.classList.add('btn_done');

    span.innerText = new_input.value;
    span.style.cursor = "pointer"
    span.setAttribute("onclick", `change_input_onclick(${id}, event)`);

    // 1. 해당 노드의 정보 받기
    // 2. 비동기 통신 보내기.
    // 3. 성공하면 크리에이트 함수 동작 할 때의 노드 상태와 똑같이 바꾸기.
    // 4. 실패하면 안되게 하기

    axios({
            url: `/todos/edit/`,
            method: 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data: {
                'todo': new_input.value,
                'id': id,
            },
        })
        .then(function(response) {
            let result = response.data['is_success']
            if (result === true) {
                if (new_input.value === '') {
                    alert('수정해주세요');
                } else {
                event_parent.replaceChild(span, secondNode);
                event_parent.removeChild(thirdNode);
                }
            } else {
                alert('fail');
            }
        })
        .catch((error) => {
            console.log(error);
        })

}


function change_input_onclick(id, event) {

    // 1. 해당 노드의 정보 받기.
    // 2. 그 노드를 인풋 텍스트로 바꾸기
    // 3. 버튼도 이제 수정완료로 바꾸기. !! 온클릭 이벤트 제대로 연결줘야함
    let Edit_button = document.createElement('button');
    let new_input = document.createElement('input');
    let current_input = document.querySelector('.new_input');
    let event_parent = event.target.parentElement;
    let secondNode = event_parent.children[1];
    let thirdNode = event_parent.children[2];


    Edit_button.innerText = '수정!'
    Edit_button.setAttribute("onclick", `edit_success_onclick(${id}, event)`);

    new_input.classList.add('new_input');
    new_input.classList.add('todo_list_li');

    if (current_input) {
        alert('한번에 하나만 수정해주세욥');
    } else{
    event_parent.replaceChild(new_input, secondNode);
    event_parent.replaceChild(Edit_button, thirdNode);
    event_parent.appendChild(thirdNode);
    }
    $('.new_input').keydown((key) => {
        if (key.keyCode === 13) {
            edit_success_onclick(id, event);
        }
    });

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
                let dd = event.target.parentElement;
                dd.remove();

            } else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}



function done_onclick(id, event) {

    axios({
            url: `/todos/done/`,
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
                console.log(id)

            } else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
}