
function like(element, id) {

    var element_span = element.parentElement.querySelector('.like_count');
    var qtd_like = element_span.innerHTML;
    
    $.getJSON('/articles/like/'+id, function (data){
        element_span.innerHTML = data;
    });
  }