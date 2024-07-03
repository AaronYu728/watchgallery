let itemDetail;
window.onload = function () {
  let cartitemlistarr = JSON.parse(localStorage.getItem("itemlist"));
  if (cartitemlistarr && cartitemlistarr.length > 0) {
    reloadShoppingCartView(cartitemlistarr);
  } else {
    document.getElementById(
      "cartitemlist"
    ).innerHTML = `<p class="NOITEMPROMOPT">You don't have any items in your cart. Let's get shopping!</p>`;
  }

  itemDetail = JSON.parse(localStorage.getItem("detailData"));
  if (itemDetail) {
    reloadInfoContainer(itemDetail);
  }
};

function reloadInfoContainer(itemdata) {
  let imgArr = itemdata.subimg;

  let infoContainerHtml = `
    <div>
        <img id="mainImg"
        src=${itemdata.itemimg}
        alt="main image"
        />
        <div class="slideimages">
        <img onmouseover="subimgMouseover(this)"
            id="img-1"
            src=${imgArr[0]}
            alt="slide image-1"
        />
        <img onmouseover="subimgMouseover(this)"
            id="img-2"
            src=${imgArr[1]}
            alt="slide image-2"
        />
        <img onmouseover="subimgMouseover(this)"
            id="img-3"
            src=${imgArr[2]}
            alt="slide image-3"
        />
        <img onmouseover="subimgMouseover(this)"
            id="img-4"
            src=${imgArr[3]}
            alt="slide image-4"
        />
        </div>
    </div>
    <div>
        <h3 id="productName">
        ${itemdata.itemname}
        </h3>
        <h5>Model: ${itemdata.model}</h5>
        <h3>$<span>${itemdata.itemprice}</span></h3>
        <button class="btn btn-primary mb-5" onclick="addtocart()">Add to Cart</button>
        <h3>Product Overview</h3>
        <p>${itemdata.overview}</p>
    </div>`;
  document.querySelector(".product-container").innerHTML = infoContainerHtml;
}

function addtocart() {
  let itemObj = {
    productname: itemDetail.itemname,
    productimg: itemDetail.itemimg,
    productprice: itemDetail.itemprice,
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

function subimgMouseover(ele) {
  document.getElementById("mainImg").src = ele.src;
}
