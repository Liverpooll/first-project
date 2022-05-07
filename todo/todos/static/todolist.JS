const inner_box = document.querySelector('.Down-box1');




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
                    const node_list = document.querySelectorAll('.todo_list_div');
                    const li = document.createElement("li");
                    const button = document.createElement("button");
                    const button_1 = document.createElement("button");
                    const div = document.createElement("div");
                    const nbsp = document.createTextNode('\u00a0\u00a0')
                    li.classList.add('todo_list');
                    div.id = node_list.length;
                    div.classList.add('todo_list_div');
                    div.innerHTML = todo_value;
                    button.innerHTML = 'M';
                    button.classList.add('btn_edit');
                    button.id = id
                    button.value = node_list.length;
                    button_1.innerHTML = 'X';
                    button_1.classList.add('btn_delete');
                    button.id = id;
                    button_1.value = node_list.length;

                    li.appendChild(div);
                    li.appendChild(nbsp);
                    li.appendChild(button);
                    li.appendChild(button_1);
                    inner_box.appendChild(li);

                    button.addEventListener('click', (event) => {
                        real_edit(id, event)
                    });
                    button_1.addEventListener('click', (event) => {
                        delete_todo(id, event)
                    });
                    
                    


                    // let new_todo_li = `<li class="todo_list"> 
                    // <div id="${node_list.length}"class="todo_list_div">
                    // ${todo_value}
                    // </div>
                    // &nbsp
                    // <button onclick="delete_todo(${id}, event)"class="btn_delete">
                    // X</button>
                    // </li>`
                    // inner_box.innerHTML += li;
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


// const btn_outline_dark = document.querySelector(".btn-outline-dark");
// btn_outline_dark.addEventListener('click', create_todo);



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
                // console.log(removingOne)
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


// 에디트할 실제 데이터 보내는 함수
// edit 수정!
function edit_todo(id, node_id) {
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
                const node_list = document.querySelectorAll('.todo_list_div');
                const new_div = document.createElement('div'); 
                const list_id = document.querySelectorAll('.todo_list_div')[node_id];
                const button = document.createElement("button");
                button.innerHTML = 'M';
                button.classList.add('btn_edit');
                button.id = id
                button.value = node_list.length;
                new_div.classList.add('.new_div');
                new_div.innerHTML = content;
                new_div.style.cssText = 'display:inline-block';
            
                list_id.replaceChild(new_div, list_id.childNodes[0]);
                list_id.replaceChild(button, list_id.childNodes[1]);
                            
                button.addEventListener('click', (event) => {
                    real_edit(id, event)
                });
      
            } else {
                alert('fail');
            }
        })
        .catch((error) => {
            console.log(error);
        })
};
// // edit

                


// real_edit

// 수정버튼으로 바뀌는 함수
const real_edit = function (id, event) {
    let node_id = event.target.value;
    const list_id = document.querySelectorAll('.todo_list_div')[node_id];
    const new_input = document.createElement('input');
    const button_2 = document.createElement('button');
    
    button_2.type = 'button';
    button_2.innerText = '수정!';
    button_2.classList.add('new_button');
    new_input.type = 'text';
    new_input.placeholder = list_id.innerHTML;
    new_input.classList.add('new_input');



    list_id.replaceChild(new_input, list_id.firstChild);
    $(event.target).remove();
    list_id.append(button_2);

    button_2.addEventListener('click', () => {
        edit_todo(id, node_id);
    });



    $('.new_input').keydown((key) => {
        if (key.keyCode === 13) {
            edit_todo(id, node_id);
        }
    });
}















// const test_event = '';
// let real_edit = function(id, event) {
//     let node_id = event.target.value;
//     console.log(node_id)
//     let content = document.querySelectorAll('.todo_list_div')[node_id];
//     let node_list = document.querySelectorAll('.todo_list_div');
    
    
//     let new_todo_input = `<input type="text" class="new_todo_input" placeholder="${content.innerHTML}">
//     </input>`
//     content.innerHTML = new_todo_input
//     $('.new_todo_input').keydown((key) => {
//         if (key.keyCode === 13) {
//             let new_todo_value = $(".new_todo_input").val();
//             let new_todo_li = `
//             <p class="todo_list_div" value=${new_todo_value} onclick="input_todo(${id}, event)"> 
//             ${new_todo_value}
//             </p>`
//             if (new_todo_value == '') {
//                 alert('최소 1자 이상 입력해주세요')
//             } else {
//                 content.innerHTML = new_todo_li;
//             }
//         }
//     });
// }