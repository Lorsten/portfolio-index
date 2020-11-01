//Create and ojbect for storing the url adress for easier change
let url = new Object();
/*local
url.adress = "http://localhost/portfolio_api/index.php/";


*/
url.adress = "http://studenter.miun.se/~olan1700/dt057g/portfolio/server/index.php/";

// Function for creating a imgpath
function Createdimg(imageName,full=false) {
    const image = imageName;
    let imgsrc;
    if(full){
         imgsrc = 'images/'+image+"_full.png"
    }
    else{
         imgsrc = 'images/'+image+".jpg"
    }
    return imgsrc;
}
// Function for placing images into element based on the data retrived
function createImages(data) {
    let parent = document.getElementById("wrapper");
    let arr = {};
    let count = 0;
    let newarr = [];
    let maxDiv;

    //Create a while loop with a foreach object.keys inside to create an array with only the website ID and titel values
    while (count < data.length) {
        Object.keys(data[count]).forEach(key => {
            if (key == "website_ID" || key == 'titel_website') {
                arr[key] = data[count][key];
            }
        });
        newarr.push(arr);
        arr = {};
        count++;
    }
    let div = document.createElement("div");
    div.className = 'img-container';
    let section;
    section = document.createElement('section');
    section.className = "img-content";
    section.id ="projects";
    maxDiv = document.createElement("div");
    maxDiv.className = "max-width";

    //Using a for loop for creating the element and place a img tag inside based on the values from the newly created array
    for (let i = 0; i < newarr.length; i++) {

        let div = document.createElement("div");
        div.className = 'img-container';
        div.innerHTML = "<img src='"+Createdimg(newarr[i].titel_website)+"' alt='" + newarr[i].titel_website + "' id='" + newarr[i].website_ID + "'>";
        maxDiv.appendChild(div);
        section.appendChild(maxDiv);


    }
    
    //Place the element before the Aboutme section
    parent.insertBefore(section, document.getElementById('Aboutme'));
    //Create foreach loop for all img container to create an eventlistener for each element
    document.querySelectorAll('.img-container').forEach(item => {
        let element = document.createElement("h3");
        element.id = "image-text";
        element.innerHTML = item.firstChild.alt;

        item.addEventListener("mouseover", function (event) {
            item.appendChild(element);
            // Calc the height between the image and the parent element. Used for the text element inside the img 
            let calc = (item.offsetHeight - item.firstChild.offsetHeight);
            element.style.bottom = calc+"px";
            //Same as the last calc expect for width
            let eleWidth =  (item.offsetWidth - item.firstChild.offsetWidth);
            element.style.width = (item.offsetWidth - eleWidth)+"px";
            //Prevent bubbling
            event.stopPropagation();


        })
        //Creat an eventlistener for mousemove inside the element to create a perspective effect when moving mouse.
        item.addEventListener('mousemove', function(event){

            event.stopPropagation();
            const imgHeight = item.clientHeight;

            const imgWidth = item.clientWidth;

            // Getting both x and Y coordinate for the mouse pointer
            const xPosition = event.layerX;
            const yPosition = event.layerY;


            const yRotation = 20 * ((xPosition - imgWidth /2) / imgWidth);
            const xRotation = -20 * ((yPosition - imgHeight / 2) / imgHeight);
            //Create an string with the style for perspective
            const string = 'perspective(500px) scale(1.1) rotateX('+xRotation+ 'deg) rotateY('+yRotation+'deg)';

            item.style.transform = string;
        });
        item.addEventListener('mouseleave', function () {
            element.remove();
            item.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        });

        //Creat an evetlistener for sendign the user to the work page when clicked on the element.
        item.addEventListener('click', function (event) {
            event.stopPropagation();
           window.location.href='work.html?ID='+item.firstChild.getAttribute('id');
        })
    })

}

//Function for retriving data from API using Fetch api and GET
function getData(table, urlAdress="", useID=false,display = true,) {
    let adress;
    // If a url ID exists use adress from parameter
    if(useID){
      adress = urlAdress;
    }
    else{
        adress = url.adress + table;
    }
    fetch(adress, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Unable to retrive data");
                return;
            }
            res.json().then(data => {

                if (display) {

                    displayData(data, table);
                } else {
                    createImages(data);
                }
            })

        })
        .catch(err => console.error("Fetch error:", err));
}


// Function for displaying data on the site from the API
function displayData(data, table) {
    //Create the neccessary variables
    let count = 0;
    let article,
        list,
        button,
        headline,
        parent,
        singleElement,
        image,
        imgElement,
        section,
        maxDiv,
        titleWebsite,
        headlineCount,
        divcontainer

        if(data[0]['COLUMN_name']){
            return;
        }
        // check if data table is not website
        if (table !== 'website') {
           parent = document.getElementById('max-About');
           singleElement = false;

           // If single element
        } else {

            parent = document.getElementById('wrapper');
            singleElement = true;
            section = document.createElement('section');
            section.id = "website";
            //Create an array with the titels
            titleWebsite = ["Titel","Description"];
            headlineCount = 0;
        }

     // If data is not a single element. Create the neccessary elements needed
    if(!singleElement){
        headline = document.createElement("h3");
        headline.innerHTML = table;
        headline.className ="displaySkill";
        article = document.createElement('article');
        article.className = "skill";

        //Create a div used for placing the ul into. Will be used for jquery to allow slideToggle
        divcontainer = document.createElement("div");
        divcontainer.className = "listcontainer";

    }
    else{
        image = Createdimg(data[0].titel_website,true);
        imgElement = document.createElement('img');
        imgElement.setAttribute('src', image);
        imgElement.setAttribute('alt',data[0].titel_website);
        maxDiv = document.createElement('div');
        maxDiv.className ="max-width";

    }
    while (data.length > count) {
        if(count > 3){
            break;
        }
        
            if(singleElement){
    
            article = document.createElement('article');
            button = document.createElement('div');
            button.className = "button";
            }
            else{
                list = document.createElement('ul');
            }

            //Limit to 4 posts
        Object.keys(data[count]).forEach(key => {
            if (!singleElement) {
                if (count == 0) {
                    //Append the headline at start of the loop
                    article.appendChild(headline);
                }
            }
            // Don't include the ID value
            if (!key.includes('ID')) {
                if (singleElement) {
                       // Don't include the url value
                    if(!key.includes('url')){
                        if(headlineCount < 2){
                            article.innerHTML += "<h3> " +  titleWebsite[headlineCount] + "</h3>";
                            headlineCount++;
                        }
                 
                        article.innerHTML += "<h4> " + data[count][key] + "</h4> ";
                }
                } else {

                    list.innerHTML += "<li> " + data[count][key] + "</li> ";
                }
            }
        });

        if (singleElement) {
            button.innerHTML = "<a href='"+data[0].url+"' target='_blank'>Visit page</a>";

            article.appendChild(button);
            maxDiv.appendChild(article);
            maxDiv.appendChild(imgElement)
            section.appendChild(maxDiv);
            parent.appendChild(section);
        } else {
            divcontainer.appendChild(list);
            headline.appendChild(divcontainer);
            parent.appendChild(article);

        }
        count++;
    }
        if(document.querySelectorAll(".displaySkill").length > 0){
                $(".displaySkill" ).unbind("click").click(function(e) {
                    event.stopPropagation();
                        $(this).find("div").slideToggle( "slow", function() {
                           return;
                        });
            });
        }
}
function animating(element) {
    let data = [...document.getElementById(element).childNodes];
    let newArr = data.filter(x => x.childNodes.length > 0);
    let delay = 0;

    for (let i = 1; i < newArr.length; i++) {
        newArr[i].style.animation = "slide-up 1.2s ease-in " + delay + "s";
        delay += 0.5;
    }
}

//function for retriving the url variables
function getURLVariables(variable) {

    let query = window.location.search.substring(1);
    let variables = query.split("&");
    for (let i = 0; i < variables.length; i++) {
        let varible = variables[i].split("=");
        if (varible[0] === variable) {
            return varible[1];
        }
    }
    return false;
}

