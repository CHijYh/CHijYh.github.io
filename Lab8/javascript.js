// Для JSLint //
/*global console, history */
var FORM_ENDPOINT = "https://formcarry.com/s/SomeID";
var openBtn = document.getElementById("open-contact");
var overlay = document.getElementById("overlay");
var modal = document.getElementById("contact-modal");
var closeBtn = document.getElementById("modal-close");
var cancelBtn = document.getElementById("cancel-btn");
var form = document.getElementById("contact-form");
var statusEl = document.getElementById("form-status");
var submitBtn = document.getElementById("submit-btn");

var STORAGE_KEY = "contactFormDraft_v1";

var fields = {
    consent: document.getElementById("consent"),
    email: document.getElementById("email"),
    fullname: document.getElementById("fullname"),
    message: document.getElementById("message"),
    organization: document.getElementById("organization"),
    phone: document.getElementById("phone")
};

var pushedState = false;

function lockPageScroll(lock) {
    document.documentElement.style.overflow = (
        lock
        ? "hidden"
        : ""
    );
    document.body.style.overflow = (
        lock
        ? "hidden"
        : ""
    );
}

function setStatus(text, isError) {
    if (isError === undefined) {
        isError = false;
    }
    statusEl.textContent = text;
    statusEl.style.color = (
        isError
        ? "crimson"
        : ""
    );
}

function saveDraft() {
    var data;
    try {
        data = {
            consent: fields.consent.checked,
            email: fields.email.value,
            fullname: fields.fullname.value,
            message: fields.message.value,
            organization: fields.organization.value,
            phone: fields.phone.value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn("Ошибка сохранения в localStorage", e);
    }
}

function loadDraft() {
    var raw;
    var data;
    try {
        raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return;
        }
        data = JSON.parse(raw);
        if (data.fullname !== null) {
            fields.fullname.value = data.fullname;
        }
        if (data.email !== null) {
            fields.email.value = data.email;
        }
        if (data.phone !== null) {
            fields.phone.value = data.phone;
        }
        if (data.organization !== null) {
            fields.organization.value = data.organization;
        }
        if (data.message !== null) {
            fields.message.value = data.message;
        }
        if (data.consent !== null) {
            fields.consent.checked = data.consent;
        }
    } catch (e) {
        console.warn("Ошибка чтения из localStorage", e);
    }
}

function clearDraft() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn("Ошибка удаления черновика из localStorage", e);
    }
}

Object.keys(fields).forEach(function (key) {
    var el = fields[key];
    if (!el) {
        return;
    }
    el.addEventListener("input", function () {
        saveDraft();
    });
});

function openModal(push) {
    var url;
    if (push === undefined) {
        push = true;
    }
    loadDraft();
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    lockPageScroll(true);
    setStatus("", false);
    if (push) {
        try {
            url = new URL(window.location);
            url.searchParams.set("contact", "1");
            history.pushState({
                modal: true
            }, "", url.toString());
            pushedState = true;
        } catch (e) {
            console.warn("history push не удался", e);
        }
    }
    setTimeout(function () {
        fields.fullname.focus();
    }, 50);
}

function closeModal(useBack) {
    if (useBack === undefined) {
        useBack = false;
    }
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    lockPageScroll(false);
    setStatus("", false);

    if (useBack && pushedState) {
        try {
            history.back();
        } catch {
            pushedState = false;
        }
    } else {
        pushedState = false;
    }
}

overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
        closeModal(true);
    }
});

closeBtn.addEventListener("click", function () {
    closeModal(true);
});
cancelBtn.addEventListener("click", function () {
    closeModal(true);
});
openBtn.addEventListener("click", function () {
    openModal(true);
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
        closeModal(true);
    }
});

window.addEventListener("popstate", function () {
    var hasCnt = (new URL(window.location)).searchParams.get("contact") === "1";
    if (hasCnt && !overlay.classList.contains("open")) {
        openModal(false);
    } else if (!hasCnt && overlay.classList.contains("open")) {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        lockPageScroll(false);
        pushedState = false;
    } else {
        pushedState = hasCnt;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var hasCnt = (new URL(window.location)).searchParams.get("contact") === "1";
    if (hasCnt) {
        openModal(false);
    }
});

form.addEventListener("submit", function (e) {
    var payload;
    e.preventDefault();
    if (!fields.email.value) {
        setStatus("Пожалуйста, укажите Email.", true);
        return;
    }
    if (!fields.message.value) {
        setStatus("Пожалуйста, введите сообщение.", true);
        return;
    }
    if (!fields.consent.checked) {
        setStatus("Требуется согласие на обработку персональных данных.", true);
        return;
    }

    payload = {
        consent: fields.consent.checked,
        email: fields.email.value,
        fullname: fields.fullname.value,
        message: fields.message.value,
        organization: fields.organization.value,
        phone: fields.phone.value,
        receivedAt: new Date().toISOString()
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";
    setStatus("Отправка данных...");

    fetch(FORM_ENDPOINT, {
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }).then(function (res) {
        if (!res.ok) {
            return res.text().then(function (text) {
                throw new Error(
                    "Ошибка сервера " + res.status + " " + (text || "")
                );
            });
        }
        setStatus("Спасибо! Ваше сообщение отправлено.", false);
        form.reset();
        clearDraft();
        setTimeout(function () {
            closeModal(true);
        }, 900);
    }).catch(function (err) {
        console.error("Send error:", err);
        setStatus("Ошибка отправки. Попробуйте позже.", true);
    }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить";
    });
});