window.onload = function () {
  let itemlistarr = JSON.parse(localStorage.getItem("itemlist"));
  if (itemlistarr && itemlistarr.length > 0) {
    reloadShoppingCartView(itemlistarr);
  } else {
    document.getElementById(
      "cartitemlist"
    ).innerHTML = `<p class="NOITEMPROMOPT">You don't have any items in your cart. Let's get shopping!</p>`;
  }
  let homeproductlistcontent = "";
  homeproductList.forEach((item) => {
    homeproductlistcontent += `
    <div class="item-card">
      <a href="#" onclick="productDetailData(${JSON.stringify(item).replace(
        /\"/g,
        "'"
      )})">
        <p>${item.itemname}</p>
        <img
          class="item-img"
          src="${item.itemimg}"
          alt="Garmin VivoActive 4S Smart Watch"
        />
      </a>

      <div class="itmeprice-add">
        <h2>$<span>${item.itemprice}</span></h2>
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

function productDetailData(itemobj) {
  localStorage.setItem("detailData", JSON.stringify(itemobj));
  window.location.href = "./html/productdetail.html";
}

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
  if (productList.length === 0 || !productList) {
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
