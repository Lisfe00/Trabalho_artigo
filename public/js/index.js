
function like(element, id) {

    var element_span = element.parentElement.querySelector('.like_count');
    var qtd_like = element_span.innerHTML;
    
    $.getJSON('/articles/like/'+id, function (data){
        element_span.innerHTML = data;
    });
  }


function search(){
    
    let input = document.querySelector(".search_input").value.toLowerCase();;
    let cards = document.querySelectorAll(".card");

    console.log(input);

    console.log(cards);

    cards.forEach((card) =>{
        card.style.display = "none";
    });

    if(input == ""){
        cards.forEach((card) =>{
        card.style.display = "block";
        });
    }else{
        cards.forEach((card) =>{
        let contem = card.querySelector(".titulo").innerText.toLowerCase();;
        if(contem.includes(input)){
            card.style.display = "block";
        }
        });
    }
}