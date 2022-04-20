function getCsrfToken(){
    return document.cookie.split(';')
        .find((item) => item.includes('csrftoken'))
        .split('=')[1];
}

btn_outline_dark = document.querySelector(".btn-outline-dark");
btn_outline_dark.addEventListener('click', event => {
    event.preventDefault();
    todo_value = document.querySelector(".todoValue").value
    if (todo_value == '' ) {
        alert('뭐라도 입력해봐');
    }
    else {
        alert('call axios')
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
            alert('success')
            console.log(response)
            result = response.data['is_success']
            console.log(result)
            let inner_box = document.querySelector('.Down-box1')
            if (result==true){
                inner_box.innerHTML = '<span class="text-salarify">✔</span> 휴대전화 인증이 완료되었습니다'
            }
            else {
                alert('fail')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
});