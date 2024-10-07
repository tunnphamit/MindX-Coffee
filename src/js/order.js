document.addEventListener('DOMContentLoaded', function () {
    const balanceForm = document.querySelector('#balance-form');
    const inpAmount = document.querySelector('#amount');
    const userSession = JSON.parse(localStorage.getItem('user_session'));


    function handleOrder() {
        // Implement order handling logic here
    }

    // Nạp tiền vào ví
    balanceForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        let authorEmail = userSession.user.providerData[0].email;
        let amount = parseFloat(inpAmount.value); // Chuyển amount thành số thực

        db.collection("users").where("email", "==", authorEmail)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let userDoc = doc.data();
                    let newBalance = (userDoc.balance || 0) + amount; // Tính số dư mới
                    db.collection("users").doc(doc.id).update({
                        balance: newBalance
                    })
                    .then(() => {
                        console.log("Balance updated successfully");
                        alert("Nạp thành công");
                    })
                    .catch((error) => {
                        console.error("Error updating balance: ", error);
                        alert("Có lỗi xảy ra khi nạp");
                    });
                });
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    });
});
