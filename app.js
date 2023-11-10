// select element
const productsEL = document.querySelector(".products");
const cartItemsEL = document.querySelector(".cart-items");
const subtotalEL = document.querySelector(".subtotal");
const totalItemsInCartEL = document.querySelector(".total-items-in-cart");

document.addEventListener("DOMContentLoaded", function() {



//Render Products

function renderProducts(){
   
	window.products.forEach((product) => {

		productsEL.innerHTML += ` 
				<div class="item">
		                <div class="item-container">
		                    <div class="item-img">
		                        <img src="${product.imgSrc}" alt="${product.name}">
		                    </div>
		                    <div class="desc">
		                        <h2>${product.name}</h2>
		                        <h2><small>$</small>${product.price}</h2>
		                        <p>
                                ${product.description}
		                        </p>
		                    </div>
		                    <div class="add-to-wishlist">
		                        <img src="./icons/heart.png" alt="add to wish list">
		                    </div>
		                    <div class="add-to-cart" onclick="addToCart(${product.id})">
		                        <img src="./icons/bag-plus.png" alt="add to cart">
		                    </div>
		                </div>
		            </div>

		     `;

	});
}
renderProducts();

});

//cart 

let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();


//add to cart
function addToCart(id)
{

    if(cart.some((item)=>item.id === id)){
        changeNumOfUnit('plus', id);
    }else{
        const item = products.find((product)=> product.id === id);
        cart.push({
            ...item,
            numberOfUnits:1,
        });
        // console.log(cart);
    }
    
updateCart();
}

//update cart
function updateCart()
{
    renderCartItems();
    renderSubTotal();

    //save cart item in local storage
    localStorage.setItem('CART', JSON.stringify(cart));
}

//calculate and render subtotal

function renderSubTotal(){
    let totalItem=0, totalPrice=0;

    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItem  += item.numberOfUnits;
    });

    subtotalEL.innerHTML = `Subtotal (${totalItem} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCartEL.innerHTML = totalItem;
}


//render cart items 
function renderCartItems()
{

    cartItemsEL.innerHTML = ''; //clear cart items

    cart.forEach((item)=>{
        cartItemsEL.innerHTML += `

        <div class="cart-item">
        <div class="item-info" onclick="renderItemFromCart(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNumOfUnit('minus', ${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumOfUnit('plus', ${item.id})">+</div>           
        </div>
    </div>  
        `;
    });
}

//remove item from cart

function renderItemFromCart(id){
 cart = cart.filter((item)=>item.id !==id);
 updateCart();
}

//change nuber of units

function changeNumOfUnit(action, id)
{

    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if(action ==='minus' && numberOfUnits > 1){
                numberOfUnits--;
            }else if(action === 'plus' && numberOfUnits <item.instock){
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits
        };
    });

    updateCart();
}




