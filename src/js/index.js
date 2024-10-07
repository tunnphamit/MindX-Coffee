document.addEventListener('DOMContentLoaded', function () {
    // Hiển thị danh sách sản phẩm
    const productList = document.querySelector('.product-list');

    let htmls = '';
    db.collection('products').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const product = doc.data();
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
                                <button class="btn btn-primary btn-order">Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            productList.innerHTML = htmls;

            const btnOrder = document.querySelectorAll('.btn-order');
            btnOrder.forEach(btn => {
                btn.addEventListener('click', function () {
                    checkSession();
                });
            });

        })
        .catch((error) => {
            console.error("Error fetching products: ", error);
        });
})

