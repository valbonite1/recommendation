function randomNumberID(){
  return Math.floor(Math.random()*(1000002 - 1 + 1)) + 1;
}
$(document).ready( function () {
  getProductLists();
  document.getElementById('modalSubmit').addEventListener('click', modalSubmit);

  function modalSubmit (e) {
    let productTempId = randomNumberID();
    let productName = document.getElementById('productName').value;
    let productDescription = document.getElementById('productDescription').value;
    let productCategory = document.getElementById('productCategory').value;

    const productId = productTempId+productName+randomNumberID(); //Used to give each product a unique id
    if(productName !== '' && productDescription !== ''){
      let newProduct = {
         id: productId,
        name: productName.toUpperCase(),
        category: productCategory,
        description: productDescription
       };

      //Add new product to localStorage. The localStorage key for all the product is productList'
      if(localStorage.getItem("productList") === null || localStorage.getItem("productList") === [] || localStorage.getItem("productList") === undefined ){
        let productList = [];
        productList.push(newProduct);
        localStorage.setItem("productList", JSON.stringify(productList));
      } else {
        let productList = JSON.parse(localStorage.getItem("productList"));
        productList.push(newProduct);
        localStorage.setItem("productList", JSON.stringify(productList));
      }
     } else{
       alert('All fields are required. Please check your entries again');
     }
    getProductLists();

    resetForm();
   e.preventDefault();
  }

}); //DocumentBody end tag

//get the data stored in the localStorage for display on load
function getProductLists() {
  if(localStorage.getItem("productList") === null){
    alert("Your dashboard is currently empty. Use the add button to add new products.");
    document.getElementById("search").disabled = true;
  } else {
    document.getElementById("search").disabled = false;
    let productList = JSON.parse(localStorage.getItem("productList"));
    let productDisplay = document.getElementById('productDisplay');
    //Display result
    productDisplay.innerHTML = '';
    for (let i = 0; i < productList.length; i++){
      let id = productList[i].id;
      let name = productList[i].name;
      let category = productList[i].category;
      let description = productList[i].description;

      productDisplay.innerHTML += '<li class="recom-text list-group-item"><strong>'+name+'</strong><p>'+category+'</p><p>'+description+'</p><p><a' +
          ' href="#" onclick="editProduct(\''+id+'\')" data-toggle="modal" data-target="#addNewProductModal">' +
          '<i class="fa fa-edit green-text darken-2 "></i>&nbsp;Edit</a> &nbsp;&nbsp; ' +
          '<a href="#" id="deleteId" onclick="deleteProduct(\''+id+'\')"><i class="fa fa-trash' +
          ' red-text' +
          ' darken-2"></i>&nbsp;' +
          ' Delete</a>' +
          ' </p>' +
          '</li>';
      }
    }
  }


// deleting the main bookmark.
function deleteProduct(id) {
  let productList = JSON.parse(localStorage.getItem("productList"));
  for(let i = 0; i < productList.length; i++){
    if (productList[i].id === id) {
      productList.splice(i,1);
      //console.log(result);
    }
  }
  localStorage.setItem("productList", JSON.stringify(productList)); //reset the values in the local storage
  getProductLists(); // to quickly display what is remaining from local storage.
}

// Editing a product
function editProduct(id) {
  "use strict";
  document.getElementById('modalSubmit').style.display = "none";
  document.getElementById("addNewProductModalLabel").textContent = "Edit Recommendation";

  let tempId = id;
  let parentDiv = document.getElementById('modalFooter');
  let productList = JSON.parse(localStorage.getItem("productList"));


  if (parentDiv.contains(document.getElementById("editButton"))) {
    document.getElementById('editButton').disabled = false;
  } else {
    let editButton = document.createElement('button');
    editButton.id = "editButton";
    editButton.className = "fa fa-hdd-o btn btn-outline-primary btn-sm m-2";
    editButton.textContent = " Save data";
    parentDiv.appendChild(editButton);
  }
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      document.getElementById("productName").value = productList[i].name;
      document.getElementById("productDescription").value = productList[i].description;
      document.getElementById("productCategory").value = productList[i].category;
    }
  }

  document.getElementById("editButton").addEventListener("click", function () {
    addProduct();
    let productList = JSON.parse(localStorage.getItem("productList"));
    for(let i = 0; i < productList.length; i++){
      if(productList[i].id === tempId){
        productList.splice(i,1);
      }
    }
    localStorage.setItem("productList", JSON.stringify(productList));
    getProductLists();
    resetForm();
    document.getElementById("editButton").style.display = "none";

    $(".addNewProduct").on('click',productFormReset());

  });

}

function resetForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productCategory").value = "";
}


function addProduct() {
  let productTempId = randomNumberID();
  let productName = document.getElementById('productName').value;
  let productDescription = document.getElementById('productDescription').value;
  let productCategory = document.getElementById('productCategory').value;

  const productId = productTempId + productName + randomNumberID(); //Used to give each product a unique id
  if (productName !== '' && productDescription !== '') {
    let newProduct = {
      id: productId,
      name: productName.toUpperCase(),
      category: productCategory,
      description: productDescription
    };
    if (localStorage.getItem("productList") === null || localStorage.getItem("productList") === [] || localStorage.getItem("productList") === undefined) {
      let productList = [];
      productList.push(newProduct);
      localStorage.setItem("productList", JSON.stringify(productList));
    } else {
      let productList = JSON.parse(localStorage.getItem("productList"));
      productList.push(newProduct);
      localStorage.setItem("productList", JSON.stringify(productList));
    }
  }
}

//holdval_ document.getElementById('editButton').style.display = "none"; //checks in case of disabled button.