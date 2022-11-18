const cart_items = document.querySelector('#cart .cart-items');

const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='shop-item-button'){
    //      const id = e.target.parentNode.parentNode.id;
    //      const name = document.querySelector(`#${id} h3`).innerText;
    //     const img_src = document.querySelector(`#${id} img`).src;
    //     const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        
    //     let total_cart_price = document.querySelector('#total-value').innerText;
    //     console.log(total_cart_price);
    //     if (document.querySelector(`#in-cart-${id}`)){
    //         alert('This item is already added to the cart');
    //         return;
    //     }
    //     document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
    //     const cart_item = document.createElement('div');
    //     cart_item.classList.add('cart-row');
    //     cart_item.setAttribute('id',`in-cart-${id}`);
    //     total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
    //     total_cart_price = total_cart_price.toFixed(2)
    //     document.querySelector('#total-value').innerText = `${total_cart_price}`;
    //     cart_item.innerHTML = `
    //     <span class='cart-item cart-column'>
    //     <img class='cart-img' src="${img_src}" alt="">
    //         <span>${name}</span>
    //     </span>
    //     <span class='cart-price cart-column'>${price}</span>
    //     <span class='cart-quantity cart-column'>
    //         <input type="text" value="1">
    //         <button>REMOVE</button>
    //     </span>`
    //     cart_items.appendChild(cart_item)
    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style = "display:block;"
        
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/products').then((response)=>{
        console.log(response.data);
            if(response.request.status===200){
            for(var i=0;i<response.data.length;i++){
                showProductsOnScreen(response.data[i]);
            }
        } else{
            console.log("Get is not working");
        }
    })      
})

function showProductsOnScreen(response){
        
        let parentNode=document.getElementById('music');
        let childNode=
        `<div id="music-content">
        <div id='${response.description}'>
        <h3>${response.title}</h3>
        <div class="image-container">
            <img class="prod-images" src='${response.imageUrl}' alt="">
        </div>
        <div class="prod-details">
            <span>$<span>${response.price}</span></span>
            <button onClick='addToCart(${response.id})'class="shop-item-button" type='button'>ADD TO CART</button>
        </div>
        </div></div>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
       
}
function addToCart(productId){
    axios.post('http://localhost:3000/cart',{productId:productId})
    .then(response=>{
        console.log(response);
        if(response.status===200){
            
            showNotification(response.data.message)
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
function showNotification(message){
    const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>${message}<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/cart')
    .then((response)=>{
        if(response.status===200){
        console.log(response);
        showCart(response.data.products);
    }
    })
    .catch(err=>{
        console.log(err);
    })
})

// function getCart(){
    
// }

function showCart(cart){
    
    for(var i=0;i<cart.length;i++){
        const id = cart[i].id;
        const name = cart[i].title;
        const img_src = cart[i].imageUrl;
        const price = cart[i].price;
        const quantity=cart[i].cartItem.quantity;
        let total_cart_price = document.querySelector('#total-value').innerText;
        //console.log(total_cart_price);
        
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
        </span>
        <span class='cart-price cart-column'>${price}</span>
        <span class='cart-quantity cart-column'>
            ${quantity}
             <button>REMOVE</button>
        </span>`
        cart_items.appendChild(cart_item);
    }
    
}