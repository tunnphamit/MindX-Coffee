// Hiển thị danh sách sản phẩm
const productList = document.querySelector('.product-list');
let htmls = '';
db.collection('products').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productId = doc.id;
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
            htmls += `
                    <div class="product-item col-md-3 col-6">
                        <div class="content">
                            <img src="${product.imageUrl}" alt="${product.name}">
                            <div class="text p-2">
                                <div class="d-flex justify-content-between">
                                    <h6>${product.name}</h6>
                                    <h6>${formattedPrice}</h6>
                                </div>
                                <button class="btn btn-primary btn-order" data-id=${productId}>Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                `;
        });
        productList.innerHTML = htmls;

        let btnOrder = document.querySelectorAll('.btn-order');
        btnOrder.forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                checkSession();
                showOrderForm(productId);
            });
        });

    })
    .catch((error) => {
        console.error("Error fetching products: ", error);
    });

function showOrderForm(productId) {
    let orderForm = document.querySelector(".order-form");
    orderForm.style.display = 'block';

    // Lấy thông tin sản phẩm by id
    db.collection('products').doc(productId).get()
        .then((doc) => {
            if (doc.exists) {
                const product = doc.data();
                const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
                // Hiển thị thông tin sản phẩm trong form đặt hàng
                orderForm.style.display = 'block';
                orderForm.innerHTML = `
                        <div class="content p-2 rounded-md">
                            <button class="btn text-black btn-cancel">Đóng</button>
                            <div class="row">
                                <div class="col-md-4 col-12">
                                    <img src="${product.imageUrl}" alt="${product.name}">
                                </div>
                                <div class="col-md-8 col-12">
                                    <h5>${product.name}</h5>
                                    <p>Giá: ${formattedPrice}</p>
                                    <form id="order-form">
                                        <div>
                                            <label for="quantity">Số lượng</label>
                                            <input type="number" id="quantity" value="1" min="1">
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-4">Đặt hàng</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `;

                // Thêm sự kiện cho nút đóng form
                const btnCancel = orderForm.querySelector('.btn-cancel');
                btnCancel.addEventListener('click', function () {
                    orderForm.innerHTML = '';
                    orderForm.style.display = 'none';
                });

                // Thêm sự kiện cho form đặt hàng
                const orderFormElement = document.querySelector("#order-form");
                orderFormElement.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const quantity = document.getElementById('quantity').value;
                    handleOrder(productId, quantity);
                });

            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });

}

function handleOrder(productId, quantity) {
    if (!userSession) {
        return;
    }
    const userId = userSession.user.uid;
    const orderData = {
        productId: productId,
        quantity: quantity,
        userId: userId,
        status: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('orders').add(orderData)
        .then(() => {
            alert("Đặt hàng thành công");
            document.querySelector(".order-form").style.display = 'none';
        })
        .catch((error) => {
            console.error("Error placing order: ", error);
        });
}


