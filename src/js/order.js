const orderList = document.querySelector('.order-list');
console.log(userSession);

function getOrderList() {
    let authorEmail = userSession?.user.email;
    let htmls = "";
    db.collection("orders").where("author", "==", authorEmail)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const orderItem = doc.data();
                const createdAt = orderItem.createdAt.toDate(); // Chuyển đổi Firestore Timestamp thành đối tượng Date
                const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'};
                const formattedDate = createdAt.toLocaleString('vi-VN', options); // Định dạng ngày tháng và giờ theo định dạng Việt Nam

                let statusString = "";
                if (orderItem.status == 0) {
                    statusString = "Chờ xác nhận";
                }
                else if (orderItem.status == 1) {
                    statusString = "Chờ vận chuyển";
                }
                else if (orderItem.status == 2) {
                    statusString = "Đã nhận";
                }

                htmls += `
                    <div class="order-item shadow-md">
                        <div class="d-flex align-items-center px-2">
                            <img class="rounded-md" src="${orderItem.product.imageUrl}" alt="${orderItem.product.name}">
                            <div class="content p-2">
                                <h6>${orderItem.product.name}</h6>
                                <p>Tổng tiền: ${orderItem.product.price * parseInt(orderItem.quantity)}</p>
                                <p>Ngày đặt: ${formattedDate}</p>
                                <p>Trạng thái: <i>${statusString}</i></p>
                            </div>
                            <div class="actions">
                                
                            </div>
                        </div>
                    </div>
                `;
            });
            orderList.innerHTML = htmls;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

getOrderList();
