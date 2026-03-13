function addPostCard(post){ // gehe auf Bootstrap
    const cad = document.createElement('div');
    addPostCard.classList.add('card');
    addPostCard.style.wisth = '18rem';
    // card body
    // text
    // appendChild
    //
}

function loadPostData(){
    fetch('posts.json')
    .then(response => console.log(response.json))
    .then(data => {
        for(const post of data.posts){
            addPostCard(post);
        }
    }) // promise
    .catch(console.error( 0> 
        console.log(error); // fehler f user
    );
    )
}


document.getElementById("load-posts").addEventListener('click', function(){
    loadPostData();
})