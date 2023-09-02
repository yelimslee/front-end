document.addEventListener('DOMContentLoaded', function() {
    const usernameField = document.getElementById('username');
    const duplicateMessage = document.getElementById('duplicate-message');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const passwordMessage = document.getElementById('password-message');
    const signupButton = document.getElementById('signup-button');

    // 이미 중복 체크를 수행한 아이디 목록을 저장하는 변수
    const checkedUsernames = [];

    // 아이디 중복 체크를 수행하는 함수
    function checkUsernameDuplicate() {
        const username = usernameField.value;

        // 이미 중복 체크를 수행한 아이디인지 확인
        if (checkedUsernames.includes(username)) {
            return; // 이미 중복 체크한 아이디인 경우 검사를 다시 수행하지 않음
        }

        // 실제로 서버와 통신하여 아이디 중복 여부를 확인해야 함
        const isDuplicate = checkLocallyForDuplicate(username);

        if (isDuplicate) {
            duplicateMessage.textContent = '이 아이디는 이미 사용 중입니다.';
            duplicateMessage.style.color = 'red';
            signupButton.disabled = true; // 중복 아이디인 경우 회원가입 버튼 비활성화
        } else {
            duplicateMessage.textContent = '사용 가능한 아이디입니다.';
            duplicateMessage.style.color = 'green';
            signupButton.disabled = false; // 사용 가능한 아이디인 경우 회원가입 버튼 활성화
        }

        // 중복 체크를 수행한 아이디 목록에 추가
        checkedUsernames.push(username);
    }

    // 비밀번호 조건을 검사하는 함수
    function checkPassword() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;

        // 비밀번호 조건 검사
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {
            passwordMessage.textContent = '비밀번호는 대문자, 소문자, 영어, 숫자, 특수문자(@$!%*?&) 1개 이상이 포함되어야 하고, 8자 이상이어야 합니다.';
            passwordMessage.style.color = 'red';
            signupButton.disabled = true; // 비밀번호 조건을 충족하지 않으면 회원가입 버튼 비활성화
        } else {
            passwordMessage.textContent = '';
            signupButton.disabled = false; // 비밀번호 조건을 충족하면 회원가입 버튼 활성화
        }

        // 비밀번호 확인 일치 여부 검사
        if (password !== confirmPassword) {
            passwordMessage.textContent = '비밀번호가 일치하지 않습니다.';
            passwordMessage.style.color = 'red';
            signupButton.disabled = true; // 비밀번호가 일치하지 않으면 회원가입 버튼 비활성화
        }
    }

    // 간단한 아이디 중복 확인 로직 (실제 서버와 통신 필요)
    function checkLocallyForDuplicate(username) {
        // 여기에서 실제 서버와 통신하여 아이디 중복 여부를 확인하는 로직을 구현해야 함
        // 로컬 예제로 간단하게 구현합니다.
        const existingUsernames = ['user1', 'user2', 'user3']; // 가입된 아이디 목록
        return existingUsernames.includes(username);
    }

    // "아이디 중복 확인" 버튼 클릭 시 중복 체크 함수 호출
    usernameField.addEventListener('blur', checkUsernameDuplicate);

    // 비밀번호 입력 시 조건 검사 함수 호출
    passwordField.addEventListener('input', checkPassword);
    confirmPasswordField.addEventListener('input', checkPassword);
});
