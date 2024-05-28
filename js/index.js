let homeproductList = [
  {
    itemname: "Garmin VivoActive 4S Smart Watch (White/Rose Gold)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/653317-Product-0-I-638235097805482858.jpg?v=1687913360",
    itemprice: 349,
  },
  {
    itemname: "Garmin VivoActive 4 Smart Watch (Black/Slate)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/653318-Product-0-I-638235096607485668.jpg?v=1687913471",
    itemprice: 298,
  },
  {
    itemname: "Garmin VivoActive 5 Smart Watch (Black/Slate)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/665844-Product-0-I-638307609604535334.jpg?v=1695164595",
    itemprice: 499,
  },
  {
    itemname: "Garmin VivoActive 5 Smart Watch (Orchid/Orchid Metallic)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/665847-Product-0-I-638307612604665908.jpg?v=1695164716",
    itemprice: 499,
  },
  {
    itemname:
      "Ryze EVO Fitness & Wellbeing Smart Watch with Alexa (Dark Grey/Red)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/603584-Product-0-I-637976220777317716.jpg?v=1661989327",
    itemprice: 149,
  },
  {
    itemname: "Garmin VivoActive 4S Smart Watch (White/Rose Gold)",
    itemimg:
      "https://www.jbhifi.com.au/cdn/shop/products/653317-Product-0-I-638235097805482858.jpg?v=1687913360",
    itemprice: 349,
  },
];

window.onload = function () {
  let itemlistarr = JSON.parse(localStorage.getItem("itemlist"));
  if (itemlistarr) {
    reloadShoppingCartView(itemlistarr);
  }
  let homeproductlistcontent = "";
  homeproductList.forEach((item) => {
    homeproductlistcontent += `
      <div class="item-card">
        <a href="./html/productdetail.html">
          <p>${item.itemname}</p>
          <img
            class="item-img"
            src="${item.itemimg}"
            alt="Garmin VivoActive 4S Smart Watch"
          />
        </a>
    
        <div class="itmeprice-add">
          <h4>$<span>${item.itemprice}</span></h4>
          <button class="btn addbtn" onclick="addtocart(this)">
            Add to cart
          </button>
        </div>
      </div>
      `;
  });
  document.querySelector(".itemlist-container").innerHTML =
    homeproductlistcontent;
};

function addtocart(ele) {
  let itemObj = {
    productname: ele.parentNode.parentNode.querySelector("a p").innerHTML, //document.querySelector(".item-card p").innerHTML,
    productimg: ele.parentElement.parentElement.querySelector("img").src, //document.querySelector(".item-img").src,
    productprice: ele.parentElement.querySelector("span").innerHTML,
  };
  let itemlistarr = JSON.parse(localStorage.getItem("itemlist"));
  if (!itemlistarr) {
    itemlistarr = [];
  }
  itemlistarr.push(itemObj);
  localStorage.setItem("itemlist", JSON.stringify(itemlistarr));

  reloadShoppingCartView(itemlistarr);
}

function reloadShoppingCartView(productList) {
  let totalprice = 0;
  let htmlContent = "";
  let pricehtmlcontent = "";
  productList.forEach((itemobj, index) => {
    htmlContent += `
      <div class="cartitem">
      <img
        class="cartimg"
        src= ${itemobj.productimg}
        alt="image of watch"
      />
      <p class="cartname">${itemobj.productname}</p>
      <h5>$<span>${itemobj.productprice}</span></h5>
      <button class="btn btn-secondary btnremove" onclick="btnRemove(${index})">Remove</button>
      </div>
      <hr>`;
    totalprice += parseInt(itemobj.productprice);
    pricehtmlcontent = `
      <span>$${totalprice}</span>
      `;
  });
  if (productList.length == 0) {
    htmlContent = `<p class="NOITEMPROMOPT">You don't have any items in your cart. Let's get shopping!</p>`;
  }
  document.getElementById("cartitemlist").innerHTML = htmlContent;
  document.getElementById("totalprice").innerHTML = pricehtmlcontent;
  document.getElementById("badge").innerHTML = productList.length;
}

function btnRemove(index) {
  let cartList = JSON.parse(localStorage.getItem("itemlist"));
  cartList.splice(index, 1);
  reloadShoppingCartView(cartList);
  localStorage.setItem("itemlist", JSON.stringify(cartList));
}
