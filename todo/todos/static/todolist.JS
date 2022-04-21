function getCsrfToken(){
    return document.cookie.split(';')
        .find((item) => item.includes('csrftoken'))
        .split('=')[1];
}




const input_todo = function(event) {
    event.preventDefault();
    todo_value = document.querySelector(".todoValue").value
    if (todo_value == '' ) {
        alert('뭐라도 입력해봐');
    }
    else {
        axios({
            url: `/todos/create/`,
            method : 'post',
            headers: {
                "content-type": "application/json",
                'X-CSRFToken': getCsrfToken(),
            },
            data : {
                'todo': todo_value,
            },
        })
        .then(function(response){
            alert('입력되었습니다!')
            result = response.data['is_success']
            let inner_box = document.querySelector('.Down-box1')
            const hr = document.createElement("hr");
            if (result==true){
                inner_box.append(todo_value);
                inner_box.append(hr);
            }
            else {
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
