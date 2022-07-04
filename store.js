// Khai báo Class
class Product {
  constructor(id, name, img, price, type) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.type = type;
  }
}
var products = [];
let searchProducts;

//----------Lưu dữ liệu----------

function save() {
  if (localStorage.getItem("productKey") == null) {
    products = [
      new Product(
        1,
        "Iphone 12",
        "https://cdn.shopify.com/s/files/1/0550/0783/8375/files/new_345x_crop_top@2x.gif?v=1619767619",
        23000000,
        "Smartphone"
      ),
      new Product(
        2,
        "Apple Watch seri 6",
        "https://images.scratchdigital.co.nz/v7/_jbgiftguide_/assets/uploads/Apple-Watch-Range.gif?w=300&func=bound&org_if_sml=1&gravity=auto",
        13000000,
        "Watch"
      ),
      new Product(
        3,
        "Samsung S20",
        "https://eu.community.samsung.com/t5/image/serverpage/image-id/389718i8AAC118F31E93C02/image-size/large/is-moderation-mode/true?v=v2&px=999",
        22000000,
        "Smartphone"
      ),
    ];
    localStorage.setItem("productKey", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("productKey"));
  }
}

//----------Tạo bảng thông tin sản phẩm----------

function renderProduct(newProducts) {
  let tableProduct = document.getElementById("tbody");
  let htmls = newProducts.map(function (product) {
    return `<tr id="tr_${product.id}">
                <td>
                    <p>${product.name}</p>
                </td>
                <td>
                    <img class="zoom" src="${product.img}" alt="No Img">
                </td>
                <td>
                    <p>${formatCurrency(product.price)}</p>
                </td>
                <td>
                    <p>${product.type}</p>
                </td>
                <td id="action_${product.id}">
                    <button class="buttonStatus buttonEdit" onclick="edit(${product.id})">Edit</button>
                    <button class="buttonStatus buttonDel" onclick="del(${product.id})">Delete</button>
                    <button class="buttonStatus buttonSave d_none" onclick="update(${product.id})" >Save</button>
                    <button class="buttonStatus buttonCancel d_none" onclick="cancel(${product.id})" >Cancel</button>
                </td>
            </tr>`;
  });
  tableProduct.innerHTML = htmls.join("");
}

//----------Chuyển sang tiền Việt Nam----------

function formatCurrency(number) {
  return number.toLocaleString("vi", { style: "currency", currency: "VND" });
}

//----------Thêm sản phẩm----------

function add() {
  let productName = document.getElementById("addProduct").value;
  if (productName.length == 0)
    return alert("Xin vui lòng nhập tên sản phẩm.");
  let productImg = document.getElementById("addImg").value;
  let productPrice = Number(document.getElementById("addMoney").value);
  if (productPrice <= 0)
    return alert("Xin vui lòng nhập giá sản phẩm.");
  let productType = document.getElementById("addType").value;
  let productId = getId() + 1;
  let newProduct = new Product(
    productId,
    productName,
    productImg,
    productPrice,
    productType
  );

  products.push(newProduct);
  localStorage.setItem("productKey", JSON.stringify(products));
  renderProduct(products);
  clearInput();
}

//----------Xóa sản phẩm----------

function del(idProduct) {
  let del = products.findIndex(function (pro) {
    return pro.id == idProduct;
  });
  let confirmed = window.confirm(`Bạn chắc chắn xóa sản phẩm này?`);
  if (confirmed == false) {
    return;
  } else {
    products.splice(del, 1);
    localStorage.setItem("productKey", JSON.stringify(products));
    renderProduct(products);
  }
}
//----------Edit sản phẩm----------

function edit(idProduct) {
  let tr = document.getElementById(`tr_${idProduct}`);
  let product = products.find(function (idpr) {
    return idpr.id == idProduct;
  });
  console.log(product);
  tr.children[0].innerHTML = `<input class="addInput" type="text" value="${product.name}" >`;
  tr.children[1].innerHTML = `<input class="addInput" type="text" value="${product.img}" >`;
  tr.children[2].innerHTML = `<input class="addInput" type="text" value="${product.price}" >`;
  tr.children[3].innerHTML = `<select class="addInput" name="" value="${product.type}" id="addType">
                                <option value="">--Chọn loại sản phẩm--</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Watch">Watch</option>
                                </select>`;
  let action = document.getElementById(`action_${idProduct}`);

  action.children[0].classList.add("d_none");
  action.children[1].classList.add("d_none");
  action.children[2].classList.remove("d_none");
  action.children[3].classList.remove("d_none");
}

//----------Update sản phẩm----------

function update(idproduct) {
  let tr = document.getElementById(`tr_${idproduct}`);
  let product = products.find(function (idpr) {
    return idpr.id == idproduct;
  });
  let newProductName = tr.children[0].children[0].value;
  let newProductImg = tr.children[1].children[0].value;
  let newProductPrice = Number(tr.children[2].children[0].value);
  let newProductType = tr.children[3].children[0].value;

  tr.children[0].innerHTML = product.name = `<p>${newProductName}</p>`;
  tr.children[1].innerHTML = product.img = `<img src="${newProductImg}" alt="No Img" style="width:150px; height:150px">`;
  tr.children[2].innerHTML = product.price = `<p>${formatCurrency(newProductPrice)}</p>`;
  tr.children[3].innerHTML = product.type = `<p>${newProductType}</p>`;
  let action = document.getElementById(`action_${idproduct}`);
  action.children[0].classList.remove("d_none");
  action.children[1].classList.remove("d_none");
  action.children[2].classList.add("d_none");
  action.children[3].classList.add("d_none");
  for (const product of products) {
    if (product.id === idproduct) {
      product.name = newProductName;
      product.img = newProductImg;
      product.price = newProductPrice;
      product.type = newProductType;
      break;
    }
  }
  products.splice(index, 1);
  localStorage.setItem("productKey", JSON.stringify(products));
}
//----------Cancel Edit sản phẩm----------

function cancel(idproduct) {
  let tr = document.getElementById(`tr_${idproduct}`);
  let product = products.find(function (idpr) {
    return idpr.id == idproduct;
  });
  tr.children[0].innerHTML = `<p>${product.name}</p>`;
  tr.children[1].innerHTML = `<img src="${product.img}" alt="No Img" style="width:150px; height:150px">`;
  tr.children[2].innerHTML = `<p>${formatCurrency(product.price)}</p>`;
  tr.children[3].innerHTML = `<p>${product.type}</p>`;

  let action = document.getElementById(`action_${idproduct}`);
  action.children[0].classList.remove("d_none");
  action.children[1].classList.remove("d_none");
  action.children[2].classList.add("d_none");
  action.children[3].classList.add("d_none");
}

//----------Tạo Id----------
function getId() {
  let productTemp = [...products];
  let maxId = productTemp.sort(function (pdt1, pdt2) {
    return pdt2.id - pdt1.id;
  })[0].id;
  return maxId;
}

//----------Xóa Input----------

function clearInput() {
  document.getElementById("addProduct").value = "";
  document.getElementById("addImg").value = "";
  document.getElementById("addMoney").value = null;
}

//----------Tìm kiếm sản phẩm----------

function search() {
  let keywork = document.getElementById("search").value;
  console.log(keywork)
  let result = products.filter(function (product, index) {
    return product.name.toLowerCase().indexOf(keywork.toLowerCase()) != -1;
  })
  renderProduct(result);
};

//----------Chạy trang----------

function ready() {
  save();
  renderProduct(products);
}
ready();


