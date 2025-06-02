
        // تسجيل حساب جديد
        function signupUser() {
            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                alert("Email is already registered.");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            // حفظ المستخدم الحالي
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);

            window.location.href = './profile.html';
        }

        // تسجيل الدخول
        function loginUser() {
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // alert("Login successful");
                localStorage.setItem("name", user.name);
                localStorage.setItem("email", user.email);
                window.location.href = './profile.html';
            } else {
                alert("Invalid email or password");
            }
        }

        // التبديل بين تسجيل الدخول والتسجيل
        document.addEventListener("DOMContentLoaded", function () {
            const signupBtn = document.getElementById('signupBtn');
            const loginBtn = document.getElementById('loginBtn');
            const signupForm = document.getElementById('signupForm');
            const loginForm = document.getElementById('Loginform');

            signupBtn.addEventListener('click', function () {
                signupForm.style.display = 'block';
                loginForm.style.display = 'none';
            });

            loginBtn.addEventListener('click', function () {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            });
        });
  





// // localStorage.clear();