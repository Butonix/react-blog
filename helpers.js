exports.getImage = function (category){

    let img = 'home-bg.jpg';
    switch(category){
        case "Programming":
            img = 'programming.jpg';
            break;
        case "Science":
            img = 'science.jpg';
            break;
        case "Music":
            img = 'music.jpg';
            break;
        case "Sports":
            img = 'sports.jpg';
            break;
    }
    return img;
}

exports.isInputValid = function (req){

    if(
       !req.body.title || 
       !req.body.categories || 
       !req.body.content ||
       !req.body.summary ||
       !req.body.author
    ){
        return false;
    }
    
    return true;
}