const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Ekle butonuna basınca çalışacak fonksiyon:
function addTask() {
    // Eğer kutu boşsa uyarı ver
    if(inputBox.value === ''){
        alert("Bir şeyler yazmalısın!");
    } 
    else {
        // Yeni bir liste elemanı oluşturuyoruz
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Silme butonu 
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Çarpı işaretinin kodu
        li.appendChild(span);
    }
    
    // Kutuyu temizle
    inputBox.value = "";
    saveData();
}

// Listeye tıklandığında ne olacağını kontrol et
listContainer.addEventListener("click", function(e){
    // Eğer tıklanan şey bir LI ise 
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // Üstünü çiz veya kaldır
        saveData();
    }
    // Eğer tıklanan şey bir SPAN ise 
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); // Görevi sil
        saveData();
    }
}, false);

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/* LOCAL STORAGE İŞLEMLERİ
    Sayfa yenilendiğinde veriler gitmesin diye tarayıcı hafızasına kaydediyoruz.
*/

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    // Hafızada veri varsa onu getir
    listContainer.innerHTML = localStorage.getItem("data");
}

// Sayfa ilk açıldığında eski görevleri göster
showTask();