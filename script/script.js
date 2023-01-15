window.onload = function(){

//Что-то с категориями
let cats={};
$('#categorii a').on('click', function(){
  	let id=$(this).data('id');
	if(!cats[id]){
	  cats[id]=1;
	  $('head style:first').append('.category-'+id+' .tovar[data-category="'+id+'"]{display: block}')
	  $('head style:first').append('.category-'+id+' #categorii a[data-id="'+id+'"]{color: red}')
	}
	$('.page:first').attr('class', 'page category-'+id)
})
  $('#categorii a[data-id="1"]').click()

//Класс объекта корзины

function CartObject (art, price){
  this.art = art;
  this.price = price;
}

CartObject.prototype.constructor = CartObject;


//Скрипт корзины
var itemCount = 0;
var priceTotal = 0;
var cartItemsTotal = [];

// Add Item to Cart

	//Действие при нажатии купить для класс add
	$('.add').click(function (){
  	itemCount ++;

  //
	$('#itemCount').text(itemCount).css('display', 'block');
  	$(this).siblings().clone().appendTo('#cartItems').append('<button class="removeItem">Убрать</button>');

  // Calculate Total Price
  var price = parseInt($(this).siblings().find('.price').text());
  var articul = $(this).siblings().find('.itemName').text();
  
  var cartObject1 = new CartObject(articul, price);
  
  cartItemsTotal.push(cartObject1);

  console.log(cartObject1);
  console.log(cartItemsTotal);

  priceTotal += price;
  $('#cartTotal').text("Сумма: " + priceTotal + " р.");
  
  if(itemCount > 0){
    $("#clientInformation").css("display", "block");
    }    
}); 


// Hide and Show Cart Items
$('.openCloseCart').click(function(){
  $('#shoppingCart').toggle();
});


// Empty Cart
$('#emptyCart').click(function() {
  itemCount = 0;
  priceTotal = 0;

  $('#itemCount').css('display', 'none');
  $('#cartItems').text('');
  $('#cartTotal').text("Сумма: " + priceTotal + " р.");
  $("#clientInformation").css("display", "none");    
}); 



// Remove Item From Cart
$('#shoppingCart').on('click', '.removeItem', function(){
  $(this).parent().remove();  
  itemCount --;
  $('#itemCount').text(itemCount);

  // Remove Cost of Deleted Item from Total Price
  var price = parseInt($(this).siblings().find('.price').text());
  priceTotal -= price;
  $('#cartTotal').text("Сумма: " + priceTotal + " р.");

  if (itemCount == 0) {
    $('#itemCount').css('display', 'none');
    $("#clientInformation").css("display", "none"); 
  }
});


//Отправить заказ

$("#sendCartItems").on("click", function(){
  var cartJson = JSON.stringify(cartItemsTotal);
  console.log(cartJson);
  var sendCart = new XMLHttpRequest();
  sendCart.open("POST", "/send.php");
  sendCart.send(cartJson);
  return false;
});
};

