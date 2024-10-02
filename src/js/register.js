//
const inpUsername = document.querySelector(".inp-username");
const inpEmail = document.querySelector(".inp-email");
const inpPwd = document.querySelector(".inp-pwd");
const inpConfirmPwd = document.querySelector(".inp-cf-pw");

const handleRegister = () => {
    let username = inpUsername.value;
    let email = inpEmail.value;
    let pwd = inpPwd.value;
    let confirmPwd = inpConfirmPwd.value;

    // check fields empty
    if (!username || !email || !pwd || !confirmPwd) {
        alert("Please fill all field!");
        return;
    }

    let userData = { username, email, pwd, confirmPwd };

    firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      return db.collection("users").add(userData);
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Register successfully!");
      window.location.assign("http://127.0.0.1:5500/sign-in.html");
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert(errorMessage);
      // ..
    });
};
