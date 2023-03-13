var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice") ;
var productCategory = document.getElementById("productCategory") ;
var productDescription = document.getElementById("productDescription") ;
var count = document.getElementById("count");
var countLabel = document.getElementById("countLabel")
var addBtn = document.getElementById("add")
var mood = "create"
var testvar ;

var productContainer = [] ; 

if(localStorage.getItem("ourproducts")==null)
{
    productContainer = [] ;
}

else{
    productContainer = JSON.parse(localStorage.getItem("ourproducts")) ;
    displayProduct();
}

function addProduct(){
    var product = {
        name : productName.value , 
        price : productPrice.value , 
        category : productCategory.value ,
        description : productDescription.value ,
        count : count.value 
    }

    if(mood === 'create')
    {
            if(product.count > 1)
    {
        for(var i=0 ; i<product.count ; i++){
            productContainer.push(product);
        }
    }else{
        productContainer.push(product) ;
    }
    }else
    {
        productContainer[testvar] = product
        mood = 'create';
        addBtn.innerHTML = "Add Product"
    }

    localStorage.setItem("ourproducts" , JSON.stringify(productContainer));
    displayProduct() ;
    cleanUp() ;
}

function displayProduct(){
    productList = "" ;
    for(var i = 0 ; i<productContainer.length ; i++ )
    {
        productList+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button></td>
        <td><button class="btn btn-warning" onclick="editRow(${i})">Edit</button></td>
        </tr>
        `
    }
    document.getElementById("tBody").innerHTML = productList ;
    sumArray();
}




// delete all 
function deleteAll(){
    productContainer.splice(0);
    localStorage.setItem("ourproducts" , JSON.stringify(productContainer));
    displayProduct() ;
}

// delete only one row 
function deleteRow(i)
{
    productContainer.splice( i , 1 );
    localStorage.setItem("ourproducts" , JSON.stringify(productContainer));
    displayProduct();
}

// clear inputs from the labels 
function cleanUp()
{
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
    count.value = "" ;
}


// search 
function  searchProduct(term) 
{
    var productList1 = ""; 
    for(var i = 0 ; i<productContainer.length ; i++)
    {
        if(productContainer[i].name.includes(term)==true)
        {
            productList1 += 
            `
            <tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].description}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button>
            </td>
            <td>
            <button class="btn btn-warning" onclick="editRow(${i})">Edit</button>
            </td>
            </tr>
            `
            document.getElementById("tBody").innerHTML = productList1 ;
        }
    }
}

// edit row data
function editRow(i)
{
    productName.value = productContainer[i].name
    productPrice.value = productContainer[i].price
    productDescription.value = productContainer[i].description
    productCategory.value = productContainer[i].category

    addBtn.innerHTML = "Update"
    mood = "update"
    testvar = i ;
    scroll({
        top:0 , 
        behavior: 'smooth'
    })

    count.style.display = "none";
    countLabel.style.display = "none"
}


// get total price ///////////////////////////////////
function sumArray(){
    var sum = 0 ;
  
    for (var i = 0; i < productContainer.length; i ++) {
    sum += Number(productContainer[i].price)
    }
    var totalPrice = `
    <tr>
    <td colspan='2'>Total Price</td>
    <td colspan='5'>${sum}</td>
    </tr>
    `
    document.getElementById("tFoot").innerHTML = totalPrice ;
  }

  document.addEventListener("keydown" , function(keyinfo){
    if(keyinfo.keyCode == 13)
    {
        addProduct()
    }
})