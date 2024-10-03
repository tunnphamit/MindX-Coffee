document.addEventListener("DOMContentLoaded", function () {
    const inpUsername = document.querySelector(".inp-username");
    const inpEmail = document.querySelector(".inp-email");
    const inpPwd = document.querySelector(".inp-pwd");
    const inpConfirmPwd = document.querySelector(".inp-cf-pw");
    const registerForm = document.querySelector("#register-form");

    function handleRegister(event) {
        event.preventDefault() // 

        let username = inpUsername.value;
        let email = inpEmail.value;
        let pwd = inpPwd.value;
        let confirmPwd = inpConfirmPwd.value;
        let role_id = 2; // Mặc định là quyền của guest

        // check fields empty
        if (!username || !email || !pwd || !confirmPwd) {
            alert("Vui lòng điền đủ các trường");
            return;
        }
        if (pwd != confirmPwd) {
            alert("Mật khẩu không khớp");
            return;
        }

        // Check if email already exists
        db.collection("users").where("email", "==", email).get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    alert("Email đã được đăng ký");
                    return;
                } else {
                    // User data
                    let userData = {
                        username,
                        email,
                        password: pwd,
                        role_id: role_id
                    }

                    // Thêm user vào Firestore
                    db.collection("users").add(userData)
                        .then((docRef) => {
                            alert("Đăng ký thành công");
                            window.location.href = "/src/pages/login.html";
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            alert("Đăng ký thất bại");
                            console.error("Error adding document: ", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error checking email: ", error);
            });
    }

    registerForm.addEventListener("submit", handleRegister);
});
