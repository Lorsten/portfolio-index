 // Adding an eventlistener to the hamburger element
document.querySelector('.hamburger').addEventListener("click", function () {
    let menu = document.querySelector('nav');
    // get the width from the hamburgermenu and the right coner using boundingclientReact()
    let Elewidth = this.getBoundingClientRect();
    let calc = window.innerWidth - Elewidth.right;
    if (this.className == 'hamburger') {
        menu.style.top = "0%";
        this.className = "hamburger hamburger--collapse is-active";
        this.style.position = "fixed";
        this.style.right = calc+"px";
    } else {
        this.style.position = "static";
        menu.style.top = "-150%";
        this.className = "hamburger";
    }
});
//add event listener to the li inside the nav. If the user click on the menu on mobile the menu will disappears. Used for anchor
document.querySelectorAll("nav ul li").forEach(item => {
    item.addEventListener("click", function(e){
        e.stopPropagation();
        let hamburger = document.querySelector('.hamburger');
        let menu = document.querySelector('nav');
        if(hamburger.className == "hamburger hamburger--collapse is-active"){
            menu.style.top = "-150%";
            hamburger.style.position ="static";
            hamburger.className = "hamburger";
        }

    })
})

//Jquery function for smooth scrolling anchors
$(document).ready(function () {
    $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                let hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 1200, function () {
                    window.location.hash = hash;

                });
            }
        });
        $("#scrolling-container").on('click', function() {
            let hash = "#projects";
            $('html, body').animate({

                scrollTop: $(hash).offset().top
            }, 1200, function () {
                window.location.hash = hash;
    
            });
        });
      
});

function displayError(Arr,parent){
    let element;
    let parentElement = document.getElementById(parent);
    if(document.getElementById("Error-message")){
        document.getElementById('Error-message').remove();
    }
    if(!document.getElementById('Error-message')){
        element = document.createElement('div');
        element.id="Error-message";
    }
    element.innerHTML += `<h3>${Arr[0]} </h3>`;
    for(let i= 1; i < Arr.length; i++){
        element.innerHTML += `<h4>${Arr[i]} </h4>`;
    }
    parentElement.appendChild(element);
   
}

/*WIndow onload function for loading neccesary elements */
window.onload = function () {
    if (document.getElementById('infocontainer')) {
        animating('infocontainer');

    }
    //Check if element exists, than get data from API
    if (document.getElementById("Aboutme")) {
        getData('website', '', false, false);
        getData('education', '', false,true);
        getData('work', '', false,true);
    }
    /*else if (document.getElementById('infocontainer')) {
        getData('education');
        getData('work');
    }
    */

    if (document.getElementById("imgAbout")) {
        document.addEventListener('scroll', function () {
            let element = document.getElementById("Aboutme");
            let top = window.pageYOffset + window.innerHeight;
            let img = document.querySelector('#imgAbout img');
                let isvisible =  top > element.offsetTop;
                if (isvisible) {
                    img.className ="imgAnimation";
                } else {
                    img.className="portrait";
                }

            })
        }
   
    //Check if url contains an ID parameter. Get the data based on the url
    if (getURLVariables('ID')) {
        let id = getURLVariables('ID');
        let table = 'website';
        getData(table, url.adress+ table + "?ID=" + id, true);
    }
    //Add event listener for validating the contact form if element exists
    if(document.getElementById("contact-form")){
        document.getElementById("contact-form").addEventListener('submit',function(e){
            let Error = [];
            Error.push('There was an error!');

             [...this.elements].forEach(item => {
                 if(item.value.length == 0){
                     Error.push(`Field ${item.name} is empty`)

                 }
                 else if(item.name =="message"){
                     if(item.value.length < 50){
                        Error.push(`Message need to be atleast 50 charcater long`);
                     }
                 }
             })
             if(Error.length > 1){
                e.preventDefault();
                displayError(Error, "wrapper");
             }
             else{
                 alert("You did it!");
             }
        })
    }
}