// Preview ảnh
document.getElementById("imageInput").addEventListener("change", function () {
  const files = this.files;
  const previewContainer = document.getElementById("preview-container");
  previewContainer.innerHTML = "";

  Array.from(files).forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

function showToastSuccess(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
  }).showToast();
}

function showToastError(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#F87171", // màu đỏ nhạt
    stopOnFocus: true,
  }).showToast();
}


const reviewForm = document.querySelector("#review-form");

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitButton = reviewForm.querySelector("button[type='submit']");
    const spinner = submitButton.querySelector(".spinner");
    submitButton.disabled = true;
    submitButton.querySelector("span").style.display = "inline-block";
    submitButton.querySelector("span").style.marginLeft = "8px";
    submitButton.firstChild.textContent = "Đang gửi ";

    const formData = new FormData(reviewForm);

    fetch("/apps/app/reviewProxy", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Review submitted:", data);
        reviewForm.reset();
        document.getElementById("preview-container").innerHTML = "";
        showToastSuccess("Gửi đánh giá thành công chờ hệ thống phê duyệt!");
      })
      .catch((err) => {
        console.error("Lỗi gửi đánh giá:", err);
        showToastError("Gửi đánh giá thất bại!");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.firstChild.textContent = "Gửi đánh giá ";
        submitButton.querySelector("span").style.display = "none";
      });
  });
}

// Load review được duyệt
const approvedReviews = document.querySelector("#approved-reviews");
if (approvedReviews) {
  const productIdInput = document.querySelector('input[name="productId"]');
  const productId = productIdInput?.value;

  fetch(`/apps/app/reviewProxy?productId=${productId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        const approved = data.data.filter((r) => r.isApproved);
        approvedReviews.innerHTML = "";
        approved.forEach((review) => {
          const name = review.customer?.name || "Ẩn danh";
          const stars = "★★★★★☆☆☆☆☆".slice(5 - review.rate, 10 - review.rate);
          const images = review.thumbnails.map(
            (thumb) => `<img src="${thumb.url}" width="100" height="100" />`
          ).join("");
          approvedReviews.insertAdjacentHTML("beforeend", `
            <div class="review-item">
              <h4>${name} <span class="stars">${stars}</span></h4>
              <div class="content">${review.content}</div>
              ${images}
            </div>
          `);
        });
      } else {
        approvedReviews.innerHTML = "<p>Không có đánh giá nào được duyệt.</p>";
      }
    })
    .catch(() => {
      approvedReviews.innerHTML = "<p>Lỗi khi tải đánh giá.</p>";
    });
}