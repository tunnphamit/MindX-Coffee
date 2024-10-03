document.addEventListener('DOMContentLoaded', function () {
    const inpEmail = document.querySelector(".inp-email");
    const inpPwd = document.querySelector(".inp-pwd");
    const loginForm = document.querySelector("#login-form");

    function handleLogin(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        let email = inpEmail.value;
        let pwd = inpPwd.value;

        // Kiểm tra các trường có trống không
        if (!email || !pwd) {
            alert("Vui lòng điền đủ các trường");
            return;
        }

        // Kiểm tra email và mật khẩu
        db.collection("users").where("email", "==", email).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    alert("Email không tồn tại");
                    return;
                } else {
                    querySnapshot.forEach((doc) => {
                        const user = doc.data();
                        if (user.password === pwd) {
                            alert("Đăng nhập thành công");
                            
                            // Thiết lập phiên hoặc lưu thông tin đăng nhập
                            // Tạo đối tượng user session
                            const userSession = {
                                user: user,
                                expiry: new Date().getTime() + 2 * 60 * 60 * 1000 // 2 tiếng
                            };

                            // Lưu vào localStorage
                            localStorage.setItem('user_session', JSON.stringify(userSession));

                            // Chuyển hướng tới trang quản lý
                            window.location.href = "../../../index.html";
                        } else {
                            alert("Mật khẩu không đúng");
                        }
                    });
                }
            })
            .catch((error) => {
                console.error("Error checking email: ", error);
            });
    }

    loginForm.addEventListener("submit", handleLogin);
});
