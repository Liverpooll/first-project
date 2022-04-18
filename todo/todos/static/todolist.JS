var token = $("meta[name='_csrf']").attr("content"); 
var header = $("meta[name='_csrf_header']").attr("content");


$(document).ready(function(){
  $('#submit').click(function(){
    let sendData = "username"+$('input[name=username]').val();
$.ajax({
  url: '/todos/async-test/',
  type: "POST",
  data:sendData,
   dataType:'html',
  success: function (data){
    $('.Down-box1').html(data);
  },
  error: function (error){
      alert("에러");}
});
})
});
