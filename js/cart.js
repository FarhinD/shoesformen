let carts=document.querySelectorAll('.store-item-icon');

let products=[
{
  name:'Mochi tan formal derby',
  tag:'shoe1',
  price:30,
  inCart:0
},
{
  name:'Mochi black formal Moccasin',
  tag:'shoe2',
  price:25,
  inCart:0
},
{
  name:'Black casual loafers',
  tag:'shoe3',
  price:20,
  inCart:0
},
{
  name:'Black sports sneakers',
  tag:'shoe4',
  price:33,
  inCart:0
},
{
  name:'Blue-multi sports sneakers',
  tag:'shoe5',
  price:26,
  inCart:0
},
{
  name:'Grey Sneakers',
  tag:'shoe6',
  price:21,
  inCart:0
},
{
  name:'Casual sandals',
  tag:'shoe7',
  price:18,
  inCart:0
},
{
  name:'Casual Slippers',
  tag:'shoe8',
  price:13,
  inCart:0
},
{
  name:'Casual white chappals',
  tag:'shoe9',
  price:21,
  inCart:0
}
];


for(let i=0;i<carts.length;i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]) ;
    totalCost(products[i]);
  })
}
function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.basket-icon span').textContent=productNumbers;
  }
}

function cartNumbers(product){

  let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.basket-icon span').textContent=productNumbers+1;
  }
  else{
  localStorage.setItem('cartNumbers',1);
  document.querySelector('.basket-icon span').textContent=1;
} 
  
  setItems(product);
}
function setItems(product){
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);
  
  if(cartItems != null){

      if(cartItems[product.tag] == undefined){
        cartItems={
          ...cartItems,
          [product.tag]:product
        }
      }
    cartItems[product.tag].inCart += 1;
  }else{
  product.inCart=1;
  cartItems={
    [product.tag]:product
  }
}
  localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
   
function totalCost(product){
  let cartCost=localStorage.getItem('totalCost');
  

  if(cartCost!=null){
    cartCost=parseInt(cartCost);
    localStorage.setItem("totalCost",cartCost+product.price);
  }else{

      localStorage.setItem("totalCost",product.price);
        }   
}
function displayCart(){
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);
  let productContainer=document.querySelector(".products");
 let cartCost=localStorage.getItem('totalCost');
 
  if(cartItems && productContainer){
   productContainer.innerHTML='';
   Object.values(cartItems).map(item =>{
    productContainer.innerHTML += `
   <div class="product">
   <ion-icon name="close-circle"></ion-icon>
   <img src="./assets/${item.tag}.jpg">
   <span>${item.name}</span>
   </div>
   <div class="price">${item.price}</div>
   <div class="quantity">
   <ion-icon class="decrease"
   name="arrow-dropleft-circle"></ion-icon>
   <span>${item.inCart}</span>
   <ion-icon class="increase"
   name="arrow-dropright-circle"></ion-icon>
   </div>
   <div class="total">
   $${item.inCart*item.price},00
   </div>
   `;
 });
   productContainer.innerHTML += `
   <div class="basketTotalContainer">
   <h4 class="basketTotalTitle">
   Cart Total</h4>
   <h4 class="basketTotal">
   $${cartCost},00</h4>

   `;
 }
}

onLoadCartNumbers();
displayCart();