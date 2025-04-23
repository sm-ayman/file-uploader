const dragArea = document.querySelector(".body"),
  dragTxt = dragArea.querySelector("h2"),
  button = dragArea.querySelector("button"),
  input = dragArea.querySelector("input");

let myFile;

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function () {
  myFile = this.files[0];
  dragArea.classList.add("active");
  showImg();
});

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.classList.add("active");
  dragTxt.textContent = "Release to upload file";
});

dragArea.addEventListener("dragleave", () => {
  dragArea.classList.remove("active");
  dragTxt.textContent = "Drag & Drop";
});

dragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  myFile = e.dataTransfer.files[0];
  showImg();
});

function showImg() {
  let fileType = myFile.type;
  let validEx = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

  if (validEx.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let imgUrl = fileReader.result;

      // Show image in modal
      const modal = document.getElementById("previewModal");
      const previewImg = document.getElementById("previewImg");
      previewImg.src = imgUrl;
      modal.style.display = "block";
    };
    fileReader.readAsDataURL(myFile);
  } else {
    alert("❌ The file you uploaded isn't a valid image!");
    dragArea.classList.remove("active");
    dragTxt.textContent = "Drag & Drop";
  }
}

const modal = document.getElementById("previewModal");
const closeBtn = document.querySelector(".close");

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
