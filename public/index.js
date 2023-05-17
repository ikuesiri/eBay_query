

const createElement =(item)=>{
    const newElement = document.createElement("div");
    newElement.innerText = item;
    newElement.classList("result-list");
    return newElement;

}


// const search = () =>{
//     const categoryName = document.getElementById("searchId").value;
//     const resultObj = document.querySelector("#results");
//     resultObj.innerHTML = "";
//     fetch(`/api/categories?category_name=${categoryName}`)
//     // .then((response) => response.json())
//     .then((data) =>{
//             if(data && data[0].searchResult){
//                 let items = data[0].searchResult[0].item;
//                 items.forEach((eachItem) =>{
//                     const title = eachItem.title[0];
//                     resultObj.append(createElement(title));
//                 })
//             }
//         })
//         .catch((err) => console.log(err))       
// }


  function search() {
    const resultElement = document.getElementById("results");
    const searchText = document.getElementById("searchId").value;
    // clear it result element.
    resultElement.innerHTML = "";
    fetch(`/api/categories?category_name=${searchText}`)
    //   .then((response) => response.json())
    .then((data) => {
        if (data && data[0].searchResult) {
          let items = data[0].searchResult[0].item;
          items.forEach((eachItem) => {
            let element = createElement(eachItem.title[0]);
            resultElement.appendChild(element);
          });
        }
      })
      .catch((error) => console.log(error));
  }



