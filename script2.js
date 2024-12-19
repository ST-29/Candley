let carts = document.querySelectorAll('.cart')


let products = [
    {
        name: 'Scented Container Candle | Wooden wick candle',
        price: 1000,
        tag: "fps/1.avif",
        incart: 0
    },
    {
        name: 'Essential Oils Aromatherapy Candles',
        price: 499,
        tag: "fps/2.avif",
        incart: 0
    },
    {
        name: 'Calm & De-stress Aromatherapy Candle',
        price: 400,
        tag: "fps/3.avif",
        incart: 0
    },
    {
        name: 'Warm and Woodsy Candle Sampler Pack',
        price: 600,
        tag: "fps/4.avif",
        incart: 0
    },
    {
        name: 'Espresso Martini Candle Realistic / Coffee Candle',
        price: 600,
        tag: "fps/5.avif",
        incart: 0
    },
    {
        name: 'Crystal Candle Natural Stone Candle',
        price: 790,
        tag: "fps/6.avif",
        incart: 0
    },



    {
        name: 'Flower Pillar Candle Mold, Tall Aesthetic Candle Mold',
        price: 170,
        tag: "shop/seeds/1a.webp",
        incart: 0
    },
    {
        name: 'Knot Candle Silicone Mold-Hourglass <br>Pillar Candle',
        price:129,
        tag: "shop/seeds/2a.webp",
        incart: 0
    },
    {
        name: 'Rose Bouquet Mold-Bouquet Candle Silicone',
        price: 1100,
        tag: "shop/seeds/3a.webp",
        incart: 0
    },
    {
        name: 'Peony Flower Silicone Mold 3D Flower Scented Candle',
        price:130,
        tag: "shop/seeds/4a.webp",
        incart: 0
    },
    {
        name: 'Vertical Striped cylindrical candle<br> silicone mold',
        price: 1200,
        tag: "shop/seeds/5a.webp",
        incart: 0
    },
    {
        name: 'Silicone flower mold-Rose candle <br>molds-Scented candle',
        price: 130,
        tag: "shop/seeds/6a.webp",
        incart: 0
    },



];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartnumbers(products[i]);
        totalcost(products[i]);
    })
}

function onloadcartnumbers() {
    let productnumbers = localStorage.getItem('cartnumbers');

    if (productnumbers) {
        document.querySelector('.main-cart span').textContent = productnumbers;

    }
}


function cartnumbers(product) {

    let productnumbers = localStorage.getItem('cartnumbers');

    productnumbers = parseInt(productnumbers);

    if (productnumbers) {
        localStorage.setItem('cartnumbers', productnumbers + 1);
        document.querySelector('.main-cart span').textContent = productnumbers + 1;
    } else {
        localStorage.setItem('cartnumbers', 1);
        document.querySelector('.main-cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsincart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {

        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsincart", JSON.stringify(cartItems));
    console.log("My cart items are", cartItems);
}

function totalcost(product) {
    // console.log("price", product.price);
    let cartcost = localStorage.getItem('totalcost');

    console.log("my cartcost is", cartcost);
    console.log(typeof cartcost);

    if (cartcost != null) {
        cartcost = parseInt(cartcost);
        localStorage.setItem("totalcost", cartcost + product.price);
    } else {
        localStorage.setItem("totalcost", product.price);
    }

}





function displaycart() {
    let cartItems = localStorage.getItem("productsincart");
    cartItems = JSON.parse(cartItems);

    let productcontainer = document.querySelector(".products")

    console.log(cartItems);
    if (cartItems && productcontainer) {
        productcontainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productcontainer.innerHTML +=


        `<div class="cart-items products">
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.tag}" width="100" height="100">
                    <span class="cart-item-title">${item.name}</span>
                </div>
                <span class="cart-price cart-column">₹${item.price},00</span>
                <div><button class="btnn btn-danger" type="button">REMOVE</button></div>
            </div>
        </div>`
                
               
           
        }
        );
        ready()
    }


    function ready() {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItem)
        }
        
    }
    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }

}


displaycart();
onloadcartnumbers();

