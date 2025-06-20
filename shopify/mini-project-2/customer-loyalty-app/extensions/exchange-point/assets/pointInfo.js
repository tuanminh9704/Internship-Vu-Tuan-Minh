document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".loyalty-modal");
  const openButton = document.querySelector(".button-exchange-point");
  const closeButton = document.querySelector(".close-modal");
  const customerDiv = document.querySelector("#customer-id");
  const form = document.querySelector(".redeem-form");
  const successBox = document.querySelector(".redeem-success");
  const discountCodesContainer = document.getElementById("discount-codes");

  let customerId = customerDiv.dataset.id;;


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

  // Mở modal
  if (openButton && modal) {
    openButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
      renderDiscountCodes();
    });
  }

  // Đóng modal
  if (closeButton && modal) {
    closeButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Lấy điểm từ API
  if (customerDiv) {
    customerId = customerDiv.dataset.id;
    fetch(`/apps/app/customerProxy/${customerId}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched loyalty data:", data);
        if (
          data.success &&
          data.data?.customer?.points?.totalPoints !== undefined
        ) {
          const pointEl = document.querySelector(".loyalty-points strong");
          if (pointEl) {
            pointEl.textContent = data.data.customer.points.totalPoints;
          }
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy điểm từ API:", err);
      });
  }

  // Chuyển đổi tab
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab");
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      document
        .querySelector(".redeem-section")
        .classList.toggle("hidden", tab !== "redeem");
      document
        .querySelector(".redeem-history")
        .classList.toggle("hidden", tab !== "history");

      if (tab === "history") {
        loadRedeemHistory();
      }
    });
  });

  // Gửi form đổi điểm
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector(".btn-redeem");
      const spinner = submitButton.querySelector(".spinner");
      submitButton.disabled = true;
      submitButton.firstChild.textContent = "Đang gửi ";
      spinner.style.display = "inline-block";

      const formData = new FormData(form);

      try {
        const response = await fetch("/apps/app/redeemPointProxy", {
          method: "POST",
          body: formData,
        });
        showToastSuccess('Đổi điểm thành công!')

        const result = await response.json();

        if (result.success && result.data?.code) {
          discountCodesContainer.innerHTML = "";
          const item = document.createElement("div");
          item.className = "discount-code-item";
          item.innerHTML = `
            <span class="discount-code-text">${result.data.code}</span>
            <button class="btn-copy" data-code="${result.data.code}">📋 Copy</button>
          `;
          discountCodesContainer.appendChild(item);

          document.querySelectorAll(".btn-copy").forEach((button) => {
            button.addEventListener("click", () => {
              const code = button.getAttribute("data-code");
              navigator.clipboard.writeText(code).then(() => {
                button.textContent = "✅ Đã copy!";
                setTimeout(() => {
                  button.textContent = "📋 Copy";
                }, 2000);
              }).catch(() => {
                alert("Lỗi khi copy mã.");
              });
            });
          });

          successBox.classList.remove("hidden");
          form.reset();
        } else {
          alert("Đổi điểm thất bại: " + (result.message || "Có lỗi xảy ra."));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Đã xảy ra lỗi khi gửi yêu cầu.");
      } finally {
        submitButton.firstChild.textContent = "Đổi điểm lấy mã ";
        spinner.style.display = "none";
        submitButton.disabled = false;
      }
    });
  }

  // Tải lịch sử đổi điểm từ API
  function loadRedeemHistory() {
    const historyList = document.querySelector("#history-list");
    const noHistory = document.querySelector("#no-history");
    historyList.innerHTML = "";
    customerId = customerDiv.dataset.id;
    if (!customerId) {
      console.error("Không có customerId");
      noHistory.classList.remove("hidden");
      return;
    }

    fetch(`/apps/app/redeemCodeProxy/${customerId}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          result.data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${new Date(item.expiresAt).toLocaleDateString("vi-VN")}</td>
              <td>${item.pointUsed}</td>
              <td><b>${item.code}</b></td>
              <td>${item.amount.toLocaleString("vi-VN")}đ</td>
              <td>${new Date(item.expiresAt) > Date.now() ? "Còn hiệu lưc" : "Hết hạn"}</td>
            `;
            historyList.appendChild(row);
          });
          noHistory.classList.add("hidden");
        } else {
          noHistory.classList.remove("hidden");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy lịch sử điểm:", err);
        noHistory.classList.remove("hidden");
      });
  }

  function renderDiscountCodes() {
  }
});
