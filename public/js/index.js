
function like(element, id) {
    
    var likeCountElement = element.querySelector('.like_count');
    var qtd_like = likeCountElement.innerHTML;

    
    likeCountElement.innerHTML = parseInt(qtd_like) + 1;
    $.getJSON('/articles/like/'+id, function (data){
        console.log(data);
    });
  }