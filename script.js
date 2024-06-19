const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// Character dictionary
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()[]{};:-+",
};

// fungsi untuk men-generate password
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = lengthSlider.value;

  // Looping untuk ulangi setiap option
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        //Menambahkan characters staticPassword jika setiap optiondipilih
        staticPassword += characters[option.id];
      } else if (option.id == "spaces") {
        // menambahkan space jika dipilih
        staticPassword += `${staticPassword}`;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // Generate password secara acak dengan looping for
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      //Menambahkan karakter tanpa ada duplicate
      if (!randomPassword.includes(randomChar) || randomChar == " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      //add random karakter to password
      randomPassword += randomChar;
    }
  }

  // atur nilai dari input password untuk ditampilkan di text input
  passwordInput.value = randomPassword;
};

// Fungsi update indikator password
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// Fungsi update slider tanpa harus tekan generate btn
const updateSlider = () => {
  //update panjang label
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  // Hubungkan ke fungsi generate password
  generatePassword();
  // update indicator password
  updatePassIndicator();
};

// inisialisasi slider & generate password
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

// Memanggil semua kejadian agar berfungsi
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
