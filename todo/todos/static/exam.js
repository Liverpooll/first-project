let create =document.querySelector('.btn');
let edit =document.querySelector('.btn_edit');
let del = document.querySelector('.btn_delete');
const inner_box = document.querySelector('.Down-box1');

function getCsrfToken() {
  return document.cookie.split(';')
      .find((item) => item.includes('csrftoken'))
      .split('=')[1];
}

document.querySelector('.todoValue').addEventListener('keyup', (e)=>{
  if (e.keyCode === 13) {
      create_todo();
}  
});


function create_todo (event) {
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
                  button.onclick = function (event) {
                    change_input_onclick(id, event, button)
                  };
                  button_1.innerHTML = 'X';
                  button_1.onclick = function (event) {
                    delete_onclick(id, event)
                };

                  button_1.classList.add('btn_delete');
                  button.id = id;
                  button_1.value = node_list.length;

                  li.appendChild(div);
                  li.appendChild(nbsp);
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


// 체인지 인풋 온클릭 함수에서 누는 수정완료 버튼이 클릭 됐을 때 연결되는 함수
function edit_success_onclick(id, node_id, button) {
  // 1. 해당 노드의 정보 받기
  // 2. 비동기 통신 보내기.
  // 3. 성공하면 크리에이트 함수 동작 할 때의 노드 상태와 똑같이 바꾸기.
  // 4. 실패하면 안되게 하기
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
              // const button = document.createElement("button");
              // button.innerHTML = 'M';
              // button.classList.add('btn_edit');
              // button.id = id
              // button.value = node_list.length;
              // button.onclick = function (event) {
              //   change_input_onclick(id, event)
              // }
              new_div.classList.add('.new_div');
              new_div.innerHTML = content;
              new_div.style.cssText = 'display:inline-block';
          
              list_id.replaceChild(new_div, list_id.childNodes[0]);
              list_id.replaceChild(button, list_id.childNodes[1]);
    
          } else {
              alert('fail');
          }
      })
      .catch((error) => {
          console.log(error);
      })

}

function change_input_onclick(id, event, button) {
  // 1. 해당 노드의 정보 받기.
  // 2. 그 노드를 인풋 텍스트로 바꾸기
  // 3. 버튼도 이제 수정완료로 바꾸기. !! 온클릭 이벤트 제대로 연결줘야함
  let node_id = event.target.value;
  const list_id = document.querySelectorAll('.todo_list_div')[node_id];
  const new_input = document.createElement('input');
  const button_2 = document.createElement('button');
  
  button_2.type = 'button';
  button_2.innerText = '수정!';
  button_2.classList.add('new_button');
  button_2.onclick = function() {
    edit_success_onclick(id, node_id, button);
  }
  new_input.type = 'text';
  new_input.placeholder = list_id.innerHTML;
  new_input.classList.add('new_input');



  list_id.replaceChild(new_input, list_id.firstChild);
  $(event.target).remove();
  list_id.append(button_2);



  $('.new_input').keydown((key) => {
      if (key.keyCode === 13) {
          edit_success_onclick (id, node_id, event);
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