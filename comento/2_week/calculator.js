function addOutput(num) {
    var display = document.getElementById("display");
    display.value = display.value + num;
}

var isPositive = true;  // 초기값을 양수로 설정

// 화면에 문자열을 추가하는 함수
function appendToDisplay(value) {
    var display = document.getElementById("display"); 
    
    if (value === "+/-") {
        isPositive = !isPositive;
        display.textContent = isPositive ? display.textContent.replace("-", "") : "-" + display.textContent;
    } else {
    // 숫자나 연산자 버튼을 누를 때는 기존의 로직을 그대로 유지
        if (display.textContent === "0" || display.textContent === "-0") {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }
}


// 연산자를 화면에 추가하는 함수
function appendOperator(operator) {
    var display = document.getElementById("display");
    display.textContent += " " + operator + " ";
}

// 계산을 수행하는 함수
function calculate() {
    var display = document.getElementById("display");
    var result = eval(display.textContent);
    display.textContent = result;
}

// 화면을 초기화하는 함수
function reset() {
    var display = document.getElementById("display");
    display.textContent = "0";
}

// 페이지 로드가 완료되면 실행되는 함수
document.addEventListener("DOMContentLoaded", function() {
    // 모든 버튼 요소들을 선택
    var buttons = document.querySelectorAll(".button");

    // 각 버튼에 대한 이벤트 리스너 등록
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var value = button.textContent;
            
            if (value === "=") {
                calculate();  // 등호 버튼을 누르면 계산 수행
            } else if (value === "AC") {
                reset();  // AC 버튼을 누르면 화면 초기화
            } else {
                appendToDisplay(value);  // 숫자와 연산자 버튼을 누르면 화면에 추가
            }
        })
    })
})